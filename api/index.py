from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from api.db.neon import async_engine, init_db

from api.routers.feedback_router import router as feedback_router

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


# Lifespan 이벤트 핸들러 정의
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("FastAPI Server Start")

    # 데이터베이스 초기화
    await init_db()
    print("DB conn connected")

    yield  # FastAPI 실행

    print("FastAPI Server terminated")
    await async_engine.dispose()
    print("DB conn closed")


# app
app = FastAPI(
    lifespan=lifespan,
    root_path="/api",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

# routers
# - feedback
app.include_router(feedback_router, tags=["cs"])


# exception handler
# - Custom error handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [
        {
            "field": " -> ".join(map(str, err["loc"])),
            "message": err["msg"],
            "input": err.get("input", None)
        }
        for err in exc.errors()
    ]
    return JSONResponse(
        status_code=400,
        content={"detail": "Invalid input", "errors": errors},
    )


# 테스트 단계 API, 테스트 데이터로 api 틀만 구성
@app.get("/search")
def search_board():
    return {"message": "Hello from FastAPI"}


@app.get("/notice/list")
def notice_list():
    data = [
        {
            "id": 1,
            "title": "BloGuide 알파 서비스 오픈",
            "date": "2025-06-20",
            "author": "관리자",
            "content": "BloGuide 알파 서비스가 오픈되었습니다. 많은 관심과 피드백 부탁드립니다.",
            "isImportant": True,
        },
        {
            "id": 2,
            "title": "업데이트 안내",
            "date": "2025-01-29",
            "author": "관리자",
            "content": "예정된 업데이트 내용을 안내드립니다. 주요 기능 개선 및 버그 수정이 포함되어 있습니다.",
            "isImportant": False,
        },
        {
            "id": 3,
            "title": "신규 기능 제안 받습니다",
            "date": "2025-01-29",
            "author": "관리자",
            "content": "사용자 여러분의 의견을 듣고 싶습니다. BloGuide에 추가되었으면 하는 기능을 제안해주세요.",
            "isImportant": True,
        }
    ]
    return data
