# db/redis.py
from typing import Optional, List, Any
from upstash_redis import Redis
import ujson
import os

# 환경변수로부터 Redis 클라이언트 생성
moka_KV_REST_API_URL = os.getenv("moka_KV_REST_API_URL")
moka_KV_REST_API_TOKEN = os.getenv("moka_KV_REST_API_TOKEN")

redis_client = Redis(url=moka_KV_REST_API_URL, token=moka_KV_REST_API_TOKEN)
DEFAULT_REDIS_TTL = 86400  # ttl: 1day


# 문자열 저장/조회
# - Upstash Redis에 문자열 value를 저장 + TTL 설정
def redis_setex_string(key: str, value: str, ttl: int) -> None:
    try:
        # ex=ttl 로 EXPIRE 지정
        redis_client.set(key, value, ex=ttl)
    except Exception as e:
        print(f"[Redis] SETEX (string) error: {e}")


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
        print(f"[Redis] GET (string) error: {e}")
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
        print(f"[Redis] SETEX (list) error: {e}")


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
        print(f"[Redis] GET (list) error: {e}")
        return []


# JSON(dict) 저장
# - dict를 JSON 문자열로 직렬화해 저장 + TTL
def redis_setex_json(key: str, value: dict, ttl: int = DEFAULT_REDIS_TTL) -> None:
    try:
        json_str = ujson.dumps(value, reject_bytes=False)
        redis_client.set(key, json_str, ex=ttl)
    except Exception as e:
        print(f"[Redis] SETEX (json) error: {e}")


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
        print(f"[Redis] GET (json) error: {e}")
        return None
