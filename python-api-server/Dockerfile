FROM python:3.10

COPY . /app

WORKDIR /app

# 필요한 dependency들 requirements.txt에 넣어놨습니다.
RUN pip install --upgrade pip && pip install -r requirements.txt

# 이미지 빌드 과정에서 init.py 스크립트로 모델을 HuggingFace에서 다운로드하겠습니다.

EXPOSE 8000
CMD ["python", "main.py"]
#CMD ["uvicorn", "main:app", "--host", "43.202.9.254", "--port", "8000"]