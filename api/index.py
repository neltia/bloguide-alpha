from fastapi import FastAPI, Request
from api.routers.feedback_router import router as feedback_router
from api.routers.notice_router import router as notice_router

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


# app
app = FastAPI(
    root_path="/api",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

# routers
# - cs
app.include_router(feedback_router, tags=["cs"])
app.include_router(notice_router, tags=["cs"])


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
