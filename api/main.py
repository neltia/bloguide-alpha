from fastapi import FastAPI
from api.routes.trend_router import router as trend_router

# app
app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# tools/trends
app.include_router(trend_router, prefix="/api")


@app.get("/api/search")
def search_board():
    return {"message": "Hello from FastAPI"}
