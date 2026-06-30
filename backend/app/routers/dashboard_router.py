from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.chat import ChatMessage
from app.models.document import Document
from app.models.website import Website

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    total_chats = db.query(ChatMessage).count()

    total_documents = db.query(Document).count()

    total_websites = db.query(Website).count()

    return {
        "users": total_users,
        "chats": total_chats,
        "documents": total_documents,
        "websites": total_websites
    }