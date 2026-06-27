from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class Website(Base):
    __tablename__ = "websites"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String)

    crawled_at = Column(DateTime, default=datetime.utcnow)