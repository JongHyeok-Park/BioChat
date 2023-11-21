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

def remove_special_tokens(ai_prediction):
  is_in_token = False
  token_removed_sentence = ""
  for i in ai_prediction:
    if i == '<':
      is_in_token = True
    elif i == '>':
      is_in_token = False
    if i != '>' and i != '▃' and is_in_token == False:
      token_removed_sentence += i
  return token_removed_sentence
    
@api_router.post("/chat")
async def chat_api(data: Chat):
    try:
        question = data.question
        answer = remove_special_tokens(infer.get_generated_prediction(question))
        return {"answer" : answer}
    except Exception as e:
        logging.error("Something went wrong")

app.include_router(api_router)

if __name__ == "__main__":
  uvicorn.run("main:app", reload=True, port=8000, host="0.0.0.0")
