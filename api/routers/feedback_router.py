# routes/feedback_router.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.neon import get_db
from api.services import feedback_service
from api.models.feedback import FeedbackCreate, FeedbackResponse
from api.common.verify import verify_admin
from api.logger import logger
from typing import List

router = APIRouter()


# feedback 제출
@router.post("/feedback", response_model=FeedbackResponse)
async def create_feedback(feedback: FeedbackCreate, db: AsyncSession = Depends(get_db)):
    try:
        res = await feedback_service.create_feedback(db, feedback)
        logger.info(str(res))
        return res
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Database error")


# feedback 조회
@router.get("/feedback/list", response_model=List[FeedbackResponse], dependencies=[Depends(verify_admin)])
async def get_feedbacks(db: AsyncSession = Depends(get_db)):
    try:
        return await feedback_service.get_feedbacks(db)
    except Exception as e:
        logger.error(f"API error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
