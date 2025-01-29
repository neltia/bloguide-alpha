from fastapi import Header
from api.config import ADMIN_API_KEY
from fastapi import HTTPException


async def verify_admin(api_key: str = Header(...)):
    if api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized access")
