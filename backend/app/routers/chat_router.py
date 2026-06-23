from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse
)

from app.retriever import search_company_knowledge
from app.ai_service import generate_answer

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

    # Retrieve relevant company knowledge
    context = search_company_knowledge(
        request.message
    )

    print("CONTEXT:", context)

    # Generate answer using Phi3 + company context
    reply = generate_answer(
        request.message,
        "\n".join(context)
    )

    # Save chat history
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