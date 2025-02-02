# - postgresql
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
# - redis
from typing import Optional, List, Any
from upstash_redis import Redis
import ujson
import os
from dotenv import load_dotenv
from api.common import logger

# env
load_dotenv()

# SQLAlchemy 동기 엔진 생성
DATABASE_NAME = os.getenv("POSTGRES_DATABASE", "neondb")
DATABASE_HOST = os.getenv("POSTGRES_HOST")
DATABASE_USER = os.getenv("POSTGRES_USER")
DATABASE_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)
Base = declarative_base()

# Redis 클라이언트 생성
moka_KV_REST_API_URL = os.getenv("moka_KV_REST_API_URL")
moka_KV_REST_API_TOKEN = os.getenv("moka_KV_REST_API_TOKEN")
redis_client = Redis(url=moka_KV_REST_API_URL, token=moka_KV_REST_API_TOKEN)
DEFAULT_REDIS_TTL = 86400  # ttl: 1day


""" PostgreSQL """
# DB 세션 종속성
def get_db():
    with SessionLocal() as session:
        yield session


# 데이터베이스 테이블이 존재하는지 확인하는 함수
def is_db_initialized():
    with engine.connect() as conn:
        table_names = _check_tables_sync(conn)
        return bool(table_names)


# sync_conn에 대해 inspector 사용
def _check_tables_sync(sync_conn):
    inspector = inspect(sync_conn)
    return inspector.get_table_names()


# 테이블 생성 함수
def init_db():
    if not is_db_initialized():
        with engine.begin() as conn:
            Base.metadata.create_all(conn)
    print("Database initialized")


"""
Redis
"""
# 문자열 저장/조회
# - Upstash Redis에 문자열 value를 저장 + TTL 설정
def redis_setex_string(key: str, value: str, ttl: int) -> None:
    try:
        # ex=ttl 로 EXPIRE 지정
        redis_client.set(key, value, ex=ttl)
    except Exception as e:
        logger.error(f"[Redis] SETEX (string) error for key='{key}': {e}")


# 문자열 저장/조회
# - 문자열로 저장한 값을 가져옴. 존재하지 않으면 None
def redis_get_string(key: str) -> Optional[str]:
    try:
        res = redis_client.get(key)
        if res is None:
            return None
        # res가 bytes일 수 있으므로 디코딩
        if isinstance(res, bytes):
            return res.decode("utf-8")
        return str(res)
    except Exception as e:
        logger.error(f"[Redis] GET (string) error for key='{key}': {e}")
        return None


# 리스트(list) 저장
def redis_setex_list(key: str, values: List[Any], ttl: int) -> None:
    try:
        # - 기존 키 삭제
        redis_client.delete(key)

        # - rpush로 값 순차 삽입
        if values:
            str_values = [str(v) for v in values]
            # *str_values로 unpack
            redis_client.rpush(key, *str_values)

        # - expire(TTL) 설정
        redis_client.expire(key, ttl)
    except Exception as e:
        logger.error(f"[Redis] SETEX (list) error for key='{key}': {e}")


# 리스트(list) 조회
# - Redis 리스트 자료구조에서 모든 값(LRANGE)을 가져와서 List[str]로 반환
def redis_get_list(key: str) -> List[str]:
    try:
        # LRANGE key 0 -1 : 전체 아이템 조회
        data = redis_client.lrange(key, 0, -1)
        # data는 List[bytes] 혹은 List[str]이 될 수 있으므로, 일관성 위해 str 변환
        result = []
        for item in data:
            result.append(item.decode("utf-8") if isinstance(item, bytes) else item)
        return result
    except Exception as e:
        logger.error(f"[Redis] GET (list) error for key='{key}': {e}")
        return []


# JSON(dict) 저장
# - dict를 JSON 문자열로 직렬화해 저장 + TTL
def redis_setex_json(key: str, value: dict, ttl: int = DEFAULT_REDIS_TTL) -> None:
    try:
        json_str = ujson.dumps(value, reject_bytes=False)
        redis_client.set(key, json_str, ex=ttl)
    except Exception as e:
        logger.error(f"[Redis] SETEX (json) error for key='{key}': {e}")


# JSON(dict) 조회
# - JSON 형태로 저장된 값을 dict로 반환
def redis_get_json(key: str) -> Optional[dict]:
    try:
        res = redis_client.get(key)
        if res is None:
            return None
        # - bytes
        if isinstance(res, bytes):
            res = ujson.loads(res)
        # - str
        return ujson.loads(res.encode("utf-8"))
    except Exception as e:
        logger.error(f"[Redis] GET (json) error for key='{key}': {e}")
        return None


# 키 삭제 함수
def redis_delete_key(key: str) -> None:
    try:
        redis_client.delete(key)
        logger.info(f"[Redis] Key deleted: {key}")
    except Exception as e:
        logger.error(f"[Redis] DELETE error for key='{key}': {e}")
