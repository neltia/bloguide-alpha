from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from api.db import get_db
from api.services import notice_service
from api.models.board import NoticeCreate, NoticeResponse, ReleaseNoteResponse
from api.common import logger, verify_admin
from typing import List

router = APIRouter()


# 공지사항 조회
@router.get("/notice/list", response_model=List[NoticeResponse])
def notice_list(db: Session = Depends(get_db)):
    try:
        res = notice_service.get_notices(db)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="API error")


# 릴리즈 노트 조회
@router.get("/release/list", response_model=List[ReleaseNoteResponse])
def release_notes_list(db: Session = Depends(get_db)):
    return notice_service.get_release_notes(db)


# 공지사항 생성 (관리자)
@router.post("/notice", response_model=NoticeResponse, dependencies=[Depends(verify_admin)])
def create_new_notice(notice: NoticeCreate, db: Session = Depends(get_db)):
    try:
        res = notice_service.create_notice(db, notice)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="API error")
