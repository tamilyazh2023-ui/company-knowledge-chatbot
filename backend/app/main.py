from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.chat import ChatMessage

from app.routers.user_router import router as user_router
from app.routers.chat_router import router as chat_router
from app.routers.ai_router import router as ai_router
from app.routers.document_router import router as document_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Company Knowledge Chatbot API",
    version="1.0.0"
)

# -------------------- CORS --------------------

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Routers --------------------

app.include_router(user_router)
app.include_router(chat_router)
app.include_router(ai_router)
app.include_router(document_router)

# -------------------- Home --------------------

@app.get("/")
def home():
    return {
        "message": "Company Knowledge Chatbot Running Successfully 🚀"
    }