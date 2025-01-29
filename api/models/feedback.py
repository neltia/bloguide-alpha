from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, Text, Boolean
from api.db.neon import Base
from typing import Literal


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    feedback_type = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)  # New column for read status


class FeedbackCreate(BaseModel):
    name: str
    email: EmailStr
    feedback_type: Literal["bug", "feature", "improvement", "other"]  # Valid feedback types
    message: str


class FeedbackResponse(FeedbackCreate):
    model_config = {"from_attributes": True}
