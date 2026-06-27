from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.schemas.document import WebsiteRequest

from app.crawlers.pdf_reader import extract_pdf_text
from app.crawlers.website_crawler import crawl_website

from app.chunking import create_chunks
from app.embeddings import create_embeddings
from app.vector_store import store_embeddings

from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models.document import Document
from app.services.document_service import (
    save_document,
    get_all_documents,
    delete_document,
)

from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db

from app.services.website_service import (
    save_website,
    get_all_websites,
    delete_website
)

router = APIRouter(
    prefix="/document",
    tags=["Document AI"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ---------------- PDF Upload ----------------

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

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
    save_document(db, file.filename)

    return {
        "message": "Knowledge Base Updated Successfully!"
    }


# ---------------- Website Crawl ----------------

@router.post("/website")
@router.post("/website")
def crawl_company_website(
    request: WebsiteRequest,
    db: Session = Depends(get_db)
):

    website_text = crawl_website(str(request.url))
    save_website(db, str(request.url))
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

@router.get("/all")
def get_documents(
    db: Session = Depends(get_db)
):
    return get_all_documents(db)
@router.delete("/{document_id}")
def remove_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    success = delete_document(db, document_id)

    if not success:
        return {
            "message": "Document not found."
        }

    return {
        "message": "Document deleted successfully."
    }

@router.get("/websites")
def get_websites(
    db: Session = Depends(get_db)
):
    return get_all_websites(db)


@router.delete("/websites/{website_id}")
def remove_website(
    website_id: int,
    db: Session = Depends(get_db)
):
    success = delete_website(
        db,
        website_id
    )

    if not success:
        return {
            "message": "Website not found"
        }

    return {
        "message": "Website deleted successfully"
    }