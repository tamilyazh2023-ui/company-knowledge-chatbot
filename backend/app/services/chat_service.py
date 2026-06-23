from sqlalchemy.orm import Session
from app.models.chat import ChatMessage


def save_chat(db: Session, user_id: int, message: str, reply: str):
    chat = ChatMessage(
        user_id=user_id,
        message=message,
        reply=reply
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_chat_history(db: Session, user_id: int):
    chats = (
        db.query(ChatMessage)
        .filter(ChatMessage.user_id == user_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    return chats