from fastapi import APIRouter
from pydantic import BaseModel

from app.retriever import search_company_knowledge
from app.ai_service import generate_answer

router = APIRouter(prefix="/ai", tags=["AI"])

class QuestionRequest(BaseModel):
    question: str

@router.post("/ask")
def ask_question(data: QuestionRequest):

    context = search_company_knowledge(data.question)

    answer = generate_answer(
        data.question,
        "\n".join(context)
    )

    return {
        "answer": answer
    }