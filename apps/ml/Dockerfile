FROM python:3.10
WORKDIR /code
RUN pip install pipenv
COPY ./Pipfile* ./
RUN pipenv install --system

COPY ./apps/ml/ /code/apps/ml/

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "app.main:app", "--app-dir=apps/ml/src", "--host", "0.0.0.0"]
