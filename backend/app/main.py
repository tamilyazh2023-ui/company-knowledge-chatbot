from fastapi import FastAPI

from app.database import Base
from app.database import engine

from app.routers.user_router import router as user_router
from app.routers.chat_router import router as chat_router
from app.routers.ai_router import router as ai_router

from app.models.chat import ChatMessage

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Company Knowledge Chatbot API",
    version="1.0.0"
)

app.include_router(user_router)
app.include_router(chat_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "Company Knowledge Chatbot Running Successfully 🚀"
    }