# routes/trend_router.py
from fastapi import APIRouter, HTTPException
from api.db.redis import redis_get_json, redis_setex_json
from api.services.trend_service import get_google_trends
from api.logger import logging

router = APIRouter()


# trend 데이터 조회 API
# - scope: 구글 트렌드
# - Upstash Redis caching 활용, 중복 요청 처리
@router.get("/trends")
def fetch_trends(keyword: str, timeframe: str = "now 7-d"):
    # 유효성 검사
    valid_timeframes = ["now 7-d", "now 30-d"]
    if timeframe not in valid_timeframes:
        # 잘못된 입력은 400 Bad Request
        logging.warning(f"Invalid timeframe input: {timeframe}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid timeframe. Allowed: {valid_timeframes}",
        )

    # 캐시 키 생성
    cache_key = f"google_trends:{keyword}:{timeframe}"

    # 1) 캐시 조회
    cached_data = redis_get_json(cache_key)
    if cached_data:
        return {"result": cached_data}

    # 구글 트렌드 API 호출
    trend_data = get_google_trends(keyword, timeframe)
    if "error" in trend_data and trend_data["error"] == 429:
        raise HTTPException(status_code=429, detail="잠시 후에 재시도해주세요.")
    elif "error" in trend_data:
        raise HTTPException(status_code=500, detail=trend_data["error"])

    # 저장 (TTL default: 24시간)
    redis_setex_json(cache_key, trend_data)

    return {"result": trend_data}
