from pydantic import BaseModel, HttpUrl


class YouTubeChatRequest(BaseModel):
    url: HttpUrl
    question: str


class YouTubeChatResponse(BaseModel):
    answer: str