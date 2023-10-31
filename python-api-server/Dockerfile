FROM python:3.10

COPY ./app /app

WORKDIR /app

RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "43.202.9.254", "--port", "8000"]