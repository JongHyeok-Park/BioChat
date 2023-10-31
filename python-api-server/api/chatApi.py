from fastapi import APIRouter, HTTPException, status
from api.chatModel import Chat

api_router = APIRouter()

@api_router.get("")
async def chat_api(chat: Chat) -> dict:
    return {"answer" : chat.question + " answer!"}

    
