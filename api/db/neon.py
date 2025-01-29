import asyncio
from sqlalchemy import inspect
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from api.config import ASYNC_DATABASE_URL

# SQLAlchemy 비동기 엔진 생성
asyncio.set_event_loop_policy(asyncio.DefaultEventLoopPolicy())
async_engine = create_async_engine(ASYNC_DATABASE_URL, echo=True)

# 비동기 세션 생성
AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ORM Base 클래스 생성
Base = declarative_base()


# Dependency: DB 세션
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# 데이터베이스 테이블이 존재하는지 확인하는 함수
async def is_db_initialized():
    async with async_engine.connect() as conn:
        table_names = await conn.run_sync(_check_tables_sync)
        return bool(table_names)


# sync_conn에 대해 inspector 사용
def _check_tables_sync(sync_conn):
    inspector = inspect(sync_conn)
    return inspector.get_table_names()


# 테이블 생성 함수
async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database initialized")
