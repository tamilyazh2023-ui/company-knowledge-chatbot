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
from app.services.chat_service import (
    save_chat,
    get_chat_history,
    get_all_chats,
    delete_chat
)

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

    # Retrieve company knowledge
    context = search_company_knowledge(
        request.message
    )

    print("\nCONTEXT:")
    print(context)

    # No knowledge found
    if len(context) == 0:

        reply = (
            "I couldn't find any relevant information in the uploaded "
            "documents. Please upload the correct company PDF or website."
        )

    else:

        reply = generate_answer(
            request.message,
            "\n\n".join(context)
        )

    # Save chat
    save_chat(
        db=db,
        user_id=current_user["id"],
        message=request.message,
        reply=reply
    )

    return ChatResponse(
        reply=reply
    )


@router.get(
    "/history",
    response_model=list[ChatHistoryResponse]
)
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_chat_history(
        db,
        current_user["id"]
    )

@router.get("/all")
def all_chats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_chats(db)


@router.delete("/{chat_id}")
def remove_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    success = delete_chat(db, chat_id)

    if not success:
        return {
            "message": "Chat not found."
        }

    return {
        "message": "Chat deleted successfully."
    }