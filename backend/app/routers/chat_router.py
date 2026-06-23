from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse
)

from app.services.gemini_service import generate_reply

from app.utils.security import get_current_user
from app.services.chat_service import save_chat, get_chat_history


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    reply = generate_reply(request.message)

    save_chat(
        db,
        current_user["id"],
        request.message,
        reply
    )

    return ChatResponse(
        reply=reply
    )


@router.get("/history", response_model=list[ChatHistoryResponse])
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_chat_history(
        db,
        current_user["id"]
    )

