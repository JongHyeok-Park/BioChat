from fastapi import APIRouter, HTTPException, status
from api.chatModel import Chat

api_router = APIRouter()

@api_router.get("")
async def chat_api(question: str) -> dict:
    return {"answer" : question + " answer!"}

    
