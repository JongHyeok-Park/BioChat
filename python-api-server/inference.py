from scipy.special import softmax
from model import Model
import numpy as np

class Inference:
  
  def __init__(self):
    self.model = Model.load_model()
    self.tokenizer = Model.load_tokenizer()
    self.inference_device = Model.get_device()

  def get_generated_prediction(self, seed_context: str):
    input_ids = self.tokenizer(seed_context, add_special_tokens=False, return_tensors="pt")["input_ids"].to(self.inference_device)
    output_greedy = self.model.generate(input_ids, max_length=1024, do_sample=False)
    AI_prediction = self.tokenizer.decode(output_greedy[0])
    return AI_prediction