from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.chat import ChatMessage


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

    return {
        "users": total_users,
        "chats": total_chats,
        "documents": 0,
        "websites": 0
    }