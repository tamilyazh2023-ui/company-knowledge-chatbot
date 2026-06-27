from sqlalchemy import Column, Integer, String, DateTime

from app.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    file_name = Column(String)

    uploaded_by = Column(Integer)

    uploaded_at = Column(DateTime)