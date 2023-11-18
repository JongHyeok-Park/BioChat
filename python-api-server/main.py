from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from model import Model
from inference import Inference
from chat import Chat
import logging

logging.basicConfig(level = logging.INFO)

origins = [
    "*"
]

app = FastAPI()
api_router = APIRouter()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
infer = Inference()

@api_router.post("/chat")
async def chat_api(data: Chat):
    try:
        question = data.question
        answer = infer.get_generated_prediction(question)
        return {"answer" : answer}
    except Exception as e:
        logging.error("Something went wrong")

app.include_router(api_router)

if __name__ == "__main__":
  uvicorn.run("main:app", reload=True, port=8000, host="0.0.0.0")