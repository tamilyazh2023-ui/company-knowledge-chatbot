import os

from app.crawlers.pdf_reader import extract_pdf_text
from app.chunking import create_chunks
from app.embeddings import create_embeddings
from app.vector_store import store_embeddings


def build_knowledge_base():

    company_file = "data/company_data.txt"
    pdf_file = "data/company_report.pdf"
    output_file = "data/knowledge_base.txt"

    website_text = ""

    if os.path.exists(company_file):
        with open(company_file, "r", encoding="utf-8") as file:
            website_text = file.read()

    pdf_text = ""

    if os.path.exists(pdf_file):
        pdf_text = extract_pdf_text(pdf_file)

    final_text = f"""
=========================
COMPANY WEBSITE
=========================

{website_text}

=========================
COMPANY PDF
=========================

{pdf_text}
"""

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(final_text)

    print("\nKnowledge Base Created Successfully!")

    chunks = create_chunks(final_text)

    embeddings = create_embeddings(chunks)

    store_embeddings(chunks, embeddings)

    print("\nKnowledge Stored Successfully in ChromaDB!")


if __name__ == "__main__":
    build_knowledge_base()