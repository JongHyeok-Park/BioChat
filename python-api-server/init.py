import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
device = "cuda" if torch.cuda.is_available() else "cpu"
# 모델과 토크나이저를 불러옵니다.
tokenizer = AutoTokenizer.from_pretrained("microsoft/biogpt")
model = AutoModelForCausalLM.from_pretrained("microsoft/biogpt")

# ./biogpt_model 경로에 모델과 토크나이저를 저장합니다. 
model.save_pretrained("./biogpt_model")
tokenizer.save_pretrained("./biogpt_model")