from fastapi import APIRouter

from app.schemas.document import (
    WebsiteChatRequest,
    WebsiteChatResponse
)

from app.services.website_service import extract_website_text
from app.services.gemini_service import generate_reply

router = APIRouter(
    prefix="/document",
    tags=["Document AI"]
)


@router.post("/website", response_model=WebsiteChatResponse)
def website_chat(request: WebsiteChatRequest):

    website_text = extract_website_text(str(request.url))

    prompt = f"""
You are an AI assistant.

Use ONLY the following website content to answer the user's question.

Website Content:
{website_text}

Question:
{request.question}
"""

    answer = generate_reply(prompt)

    return WebsiteChatResponse(
        answer=answer
    )