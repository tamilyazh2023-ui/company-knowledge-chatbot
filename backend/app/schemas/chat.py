from datetime import datetime
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class ChatHistoryResponse(BaseModel):
    message: str
    reply: str
    created_at: datetime

    class Config:
        from_attributes = True