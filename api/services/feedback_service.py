# services/feedback_service.py
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from api.models.feedback import Feedback
from api.models.feedback import FeedbackCreate, FeedbackResponse
from api.logger import logger
from typing import List


# 피드백을 데이터베이스에 저장
def create_feedback(db: Session, feedback: FeedbackCreate) -> FeedbackResponse:
    new_feedback = Feedback(
        name=feedback.name,
        email=feedback.email,
        feedback_type=feedback.feedback_type,
        message=feedback.message
    )
    db.add(new_feedback)
    try:
        db.flush()
        db.commit()
        db.refresh(new_feedback)
        validate = FeedbackResponse.model_validate(new_feedback)
        data = validate.model_dump(exclude_none=True)
        if "id" in data:
            del data["id"]
        return data
    except Exception as e:
        logger.error(f"Database error: {str(e)}", exc_info=True)
        db.rollback()
        raise e


# 모든 피드백 조회
def get_feedbacks(db: Session) -> List[FeedbackResponse]:
    try:
        result = db.execute(select(Feedback))
    except Exception as e:
        logger.error(f"Database error: {str(e)}", exc_info=True)

    feedbacks = result.scalars().all()
    return [FeedbackResponse.model_validate(fb) for fb in feedbacks]
