from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from api.db.neon import get_db
from api.services import notice_service
from api.models.notice import NoticeCreate, NoticeResponse
from api.common.verify import verify_admin
from api.logger import logger
from typing import List

router = APIRouter()


@router.get("/notice/list", response_model=List[NoticeResponse])
def notice_list(db: Session = Depends(get_db)):
    try:
        res = notice_service.get_notices(db)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="API error")


@router.post("/notice", response_model=NoticeResponse, dependencies=[Depends(verify_admin)])
def create_new_notice(notice: NoticeCreate, db: Session = Depends(get_db)):
    try:
        res = notice_service.create_notice(db, notice)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="API error")
