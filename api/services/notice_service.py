from api.models.notice import Notice, NoticeResponse
from api.db.redis import redis_get_json, redis_setex_json, redis_delete_key
from sqlalchemy.orm import Session


CACHE_KEY = "notices_list"
CACHE_TTL = 60 * 10  # 10분


# 공지사항 리스트 조회 (캐싱 적용)
def get_notices(db: Session):
    # Redis
    cached_data = redis_get_json(key=CACHE_KEY)
    if cached_data:
        return cached_data

    # RDB
    notices = db.query(Notice).order_by(Notice.date.desc()).all()

    # DTO 변환
    notice_list = [NoticeResponse.model_validate(notice).model_dump() for notice in notices]

    # Redis에 저장
    redis_setex_json(key=CACHE_KEY, value=notice_list, ttl=CACHE_TTL)
    return notice_list


# 공지사항 생성 후 캐시 삭제
def create_notice(db: Session, notice_data):
    # - Pydantic DTO -> Dict 변환
    new_notice = Notice(**notice_data.model_dump())
    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    # 캐시 삭제
    redis_delete_key(CACHE_KEY)

    return NoticeResponse.model_validate(new_notice)
