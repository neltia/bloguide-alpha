from sqlalchemy import Column, BigInteger, String, Boolean, DateTime, Text
from sqlalchemy.schema import Identity
from api.db import Base
from datetime import datetime, timezone
from pydantic import BaseModel
from typing import Optional


# 공지사항
class Notice(Base):
    __tablename__ = "notices"

    id = Column(BigInteger, Identity(always=True), primary_key=True)
    title = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now(timezone.utc))
    author = Column(String, nullable=False)
    content = Column(String, nullable=False)
    is_important = Column(Boolean, default=False)


# 릴리즈 노트
class ReleaseNote(Base):
    __tablename__ = "release_notes"

    id = Column(BigInteger, Identity(always=True), primary_key=True)  # autoincrement 적용
    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))  # UTC 기준 TIMESTAMP
    version = Column(String(50), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)


# 공지사항 요청 DTO
class NoticeCreate(BaseModel):
    title: str
    author: str
    content: str
    is_important: Optional[bool] = False


# 공지사항 응답 DTO
class NoticeResponse(BaseModel):
    id: int
    title: str
    date: datetime
    author: str
    content: str
    is_important: bool

    model_config = {"from_attributes": True}


# 릴리즈 노트 응답 DTO
class ReleaseNoteResponse(BaseModel):
    id: int
    date: datetime  # TIMESTAMP 반영
    version: str
    title: str
    content: str

    model_config = {"from_attributes": True}
