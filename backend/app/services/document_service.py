from sqlalchemy.orm import Session

from app.models.document import Document


def save_document(db: Session, filename: str):
    document = Document(
        file_name=filename
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_all_documents(db: Session):
    return (
        db.query(Document)
        .order_by(Document.uploaded_at.desc())
        .all()
    )


def delete_document(db: Session, document_id: int):
    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        return False

    db.delete(document)
    db.commit()

    return True