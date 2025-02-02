from api.models.board import Notice, NoticeResponse
from api.models.board import ReleaseNote, ReleaseNoteResponse
from api.db import redis_get_json, redis_setex_json, redis_delete_key
from sqlalchemy.orm import Session


CACHE_KEY_NOTICES = "notices_list"
CACHE_KEY_RELEASE = "release_notes_list"
CACHE_TTL = 60 * 5  # 5분


# 공지사항 리스트 조회 (캐싱 적용)
def get_notices(db: Session):
    # Redis
    cached_data = redis_get_json(key=CACHE_KEY_NOTICES)
    if cached_data:
        return cached_data

    # RDB
    notices = db.query(Notice).order_by(Notice.date.desc()).all()

    # DTO 변환
    notice_list = [NoticeResponse.model_validate(notice).model_dump(mode="json") for notice in notices]

    # Redis에 저장
    redis_setex_json(key=CACHE_KEY_NOTICES, value=notice_list, ttl=CACHE_TTL)
    return notice_list


# 릴리즈 노트 리스트 조회 (캐싱 적용)
def get_release_notes(db: Session):
    # Redis
    cached_data = redis_get_json(key=CACHE_KEY_RELEASE)
    if cached_data:
        return cached_data

    # DB에서 데이터 조회
    release_notes = db.query(ReleaseNote).order_by(ReleaseNote.date.desc()).all()

    # DTO 변환
    release_notes_list = [ReleaseNoteResponse.model_validate(note).model_dump(mode="json") for note in release_notes]

    # Redis에 저장
    redis_setex_json(key=CACHE_KEY_RELEASE, value=release_notes_list, ttl=CACHE_TTL)
    return release_notes_list


# 공지사항 생성 후 캐시 삭제
def create_notice(db: Session, notice_data):
    # - Pydantic DTO -> Dict 변환
    new_notice = Notice(**notice_data.model_dump())
    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    # 캐시 삭제
    redis_delete_key(CACHE_KEY_NOTICES)

    return NoticeResponse.model_validate(new_notice)
