from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)

    role = Column(String, default="user")

    # NEW
    created_at = Column(DateTime, default=datetime.utcnow)

    messages = relationship(
        "ChatMessage",
        back_populates="user"
    )