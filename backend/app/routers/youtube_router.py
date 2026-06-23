from fastapi import APIRouter

from app.schemas.youtube import (
    YouTubeChatRequest,
    YouTubeChatResponse
)

from app.services.youtube_service import get_youtube_transcript
from app.services.gemini_service import generate_reply

router = APIRouter(
    prefix="/youtube",
    tags=["YouTube AI"]
)


@router.post("/chat", response_model=YouTubeChatResponse)
def youtube_chat(request: YouTubeChatRequest):

    transcript = get_youtube_transcript(str(request.url))

    prompt = f"""
You are an AI assistant.

Answer ONLY using the following YouTube transcript.

Transcript:
{transcript}

Question:
{request.question}
"""

    answer = generate_reply(prompt)

    return YouTubeChatResponse(
        answer=answer
    )