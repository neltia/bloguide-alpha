# services/feedback_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.models.feedback import Feedback
from api.models.feedback import FeedbackCreate, FeedbackResponse
from api.logger import logger
from typing import List
import asyncio


# 피드백을 데이터베이스에 저장
async def create_feedback(db: AsyncSession, feedback: FeedbackCreate) -> FeedbackResponse:
    print(f"FastAPI Event Loop: {asyncio.get_running_loop()}")  # ✅ FastAPI의 루프 확인
    print(f"DB Session: {db}")  # ✅ DB 세션이 올바르게 전달되는지 확인

    new_feedback = Feedback(
        name=feedback.name,
        email=feedback.email,
        feedback_type=feedback.feedback_type,
        message=feedback.message
    )
    db.add(new_feedback)
    try:
        await db.flush()
        await db.commit()
        await db.refresh(new_feedback)
        validate = FeedbackResponse.model_validate(new_feedback)
        data = validate.model_dump(exclude_none=True)
        if "id" in data:
            del data["id"]
        return data
    except Exception as e:
        logger.error(f"Database error: {str(e)}", exc_info=True)
        await db.rollback()
        raise e


# 모든 피드백 조회
async def get_feedbacks(db: AsyncSession) -> List[FeedbackResponse]:
    try:
        result = await db.execute(select(Feedback))
    except Exception as e:
        logger.error(f"Database error: {str(e)}", exc_info=True)

    feedbacks = result.scalars().all()
    return [FeedbackResponse.model_validate(fb) for fb in feedbacks]
