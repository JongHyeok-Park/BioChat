import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

class Model:

  def __init__(self) -> None:
    pass
  
  def get_device():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    return device
  
  def load_model():
    model = AutoModelForCausalLM.from_pretrained("microsoft/BioGPT-Large-PubMedQA")
    return model

  def load_tokenizer():
    tokenizer = AutoTokenizer.from_pretrained("microsoft/BioGPT-Large-PubMedQA")
    return tokenizer