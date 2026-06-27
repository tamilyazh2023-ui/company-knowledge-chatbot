from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.user import User
from app.models.chat import ChatMessage
from app.models.document import Document
from app.models.website import Website

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/summary")
def analytics_summary(db: Session = Depends(get_db)):

    users = db.query(User).count()

    chats = db.query(ChatMessage).count()

    documents = db.query(Document).count()

    websites = db.query(Website).count()

    return {
        "users": users,
        "chats": chats,
        "documents": documents,
        "websites": websites
    }


@router.get("/chats")
def chats_per_day(db: Session = Depends(get_db)):

    results = (
        db.query(
            func.date(ChatMessage.created_at).label("date"),
            func.count(ChatMessage.id).label("count")
        )
        .group_by(func.date(ChatMessage.created_at))
        .order_by(func.date(ChatMessage.created_at))
        .all()
    )

    return [
        {
            "date": str(row.date),
            "count": row.count
        }
        for row in results
    ]