from pydantic import BaseModel, HttpUrl


class WebsiteRequest(BaseModel):
    url: HttpUrl


class WebsiteChatResponse(BaseModel):
    answer: str