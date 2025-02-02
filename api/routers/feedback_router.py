# routes/feedback_router.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from api.db import get_db
from api.services import feedback_service
from api.models.feedback import FeedbackCreate, FeedbackResponse
from api.common import logger, verify_admin
from typing import List

router = APIRouter()


# feedback 제출
@router.post("/feedback", response_model=FeedbackResponse)
def create_feedback(feedback: FeedbackCreate, db: Session = Depends(get_db)):
    try:
        res = feedback_service.create_feedback(db, feedback)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="API error")


# feedback 조회
@router.get("/feedback/list", response_model=List[FeedbackResponse], dependencies=[Depends(verify_admin)])
def get_feedbacks(db: Session = Depends(get_db)):
    try:
        return feedback_service.get_feedbacks(db)
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"API error: {str(e)}")
