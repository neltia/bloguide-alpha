from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.models.feedback import Feedback
from api.models.feedback import FeedbackCreate, FeedbackResponse
from typing import List


# 피드백을 데이터베이스에 저장
async def create_feedback(db: AsyncSession, feedback: FeedbackCreate) -> FeedbackResponse:
    new_feedback = Feedback(
        name=feedback.name,
        email=feedback.email,
        feedback_type=feedback.feedback_type,
        message=feedback.message
    )
    db.add(new_feedback)
    await db.commit()
    await db.refresh(new_feedback)
    return FeedbackResponse.model_validate(new_feedback)


# 모든 피드백 조회
async def get_feedbacks(db: AsyncSession) -> List[FeedbackResponse]:
    result = await db.execute(select(Feedback))
    feedbacks = result.scalars().all()
    return [FeedbackResponse.model_validate(fb) for fb in feedbacks]
