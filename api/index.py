from fastapi import FastAPI

# app
app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)


@app.get("/api/search")
def search_board():
    return {"message": "Hello from FastAPI"}


@app.get("/api/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}
