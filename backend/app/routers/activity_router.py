from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.chat import ChatMessage
from app.models.document import Document
from app.models.website import Website
from app.models.user import User

router = APIRouter(
    prefix="/activity",
    tags=["Recent Activity"]
)


@router.get("/")
def get_recent_activity(db: Session = Depends(get_db)):

    activities = []

    # Latest Users
    users = (
        db.query(User)
        .order_by(User.id.desc())
        .limit(5)
        .all()
    )

    for user in users:
        activities.append({
            "type": "user",
            "message": f"{user.full_name} registered",
            "time": user.created_at
        })

    # Latest Chats
    chats = (
        db.query(ChatMessage)
        .order_by(ChatMessage.created_at.desc())
        .limit(5)
        .all()
    )

    for chat in chats:
        activities.append({
            "type": "chat",
            "message": chat.message,
            "time": chat.created_at
        })

    # Latest Documents
    docs = (
        db.query(Document)
        .order_by(Document.uploaded_at.desc())
        .limit(5)
        .all()
    )

    for doc in docs:
        activities.append({
            "type": "document",
            "message": f"{doc.file_name} uploaded",
            "time": doc.uploaded_at
        })

    # Latest Websites
    websites = (
        db.query(Website)
        .order_by(Website.crawled_at.desc())
        .limit(5)
        .all()
    )

    for website in websites:
        activities.append({
            "type": "website",
            "message": website.url,
            "time": website.crawled_at
        })

    activities.sort(
        key=lambda x: x["time"],
        reverse=True
    )

    return activities[:10]