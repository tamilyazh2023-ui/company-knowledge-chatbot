from pydantic import BaseModel, HttpUrl


class WebsiteChatRequest(BaseModel):
    url: HttpUrl
    question: str


class WebsiteChatResponse(BaseModel):
    answer: str