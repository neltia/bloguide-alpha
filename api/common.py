from fastapi import Header, HTTPException
from dotenv import load_dotenv
import logging
import sys
import os

load_dotenv()
ADMIN_API_KEY = os.getenv("ADMIN_KEY")


# 전역 로깅 설정 함수
def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)  # 기본 로그 레벨 설정

    # 로그 포맷 정의
    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    # 스트림 핸들러(콘솔 출력)
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setLevel(logging.INFO)
    stream_handler.setFormatter(formatter)

    # 핸들러 추가
    logger.addHandler(stream_handler)

    return logger


async def verify_admin(api_key: str = Header(...)):
    if api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized access")


# 초기화 시 자동 설정
logger = setup_logging()
