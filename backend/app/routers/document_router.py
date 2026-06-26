from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.schemas.document import WebsiteRequest

from app.crawlers.pdf_reader import extract_pdf_text
from app.crawlers.website_crawler import crawl_website

from app.chunking import create_chunks
from app.embeddings import create_embeddings
from app.vector_store import store_embeddings

router = APIRouter(
    prefix="/document",
    tags=["Document AI"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ---------------- PDF Upload ----------------

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {
            "message": "Only PDF files are allowed."
        }

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_pdf_text(file_path)

    chunks = create_chunks(text)

    embeddings = create_embeddings(chunks)

    store_embeddings(chunks, embeddings)

    return {
        "message": "Knowledge Base Updated Successfully!"
    }


# ---------------- Website Crawl ----------------

@router.post("/website")
def crawl_company_website(request: WebsiteRequest):

    website_text = crawl_website(str(request.url))

    if not website_text:
        return {
            "message": "Website crawling failed."
        }

    chunks = create_chunks(website_text)

    embeddings = create_embeddings(chunks)

    store_embeddings(chunks, embeddings)

    return {
        "message": "Website crawled successfully!",
        "chunks": len(chunks)
    }