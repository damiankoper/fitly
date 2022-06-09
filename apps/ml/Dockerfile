FROM python:3.10-slim-buster
WORKDIR /code
RUN pip install pipenv
COPY ./Pipfile* ./
RUN pipenv install --system

COPY ./apps/ml/ /code/apps/ml/

ARG STANDARD_SCALER_ADDRESS=https://drive.google.com/u/2/uc?id=1-2vXoz8lqz1ZOtVRUI3YVNaXGacW6oDP
ARG MODEL_ADDRESS=https://drive.google.com/u/2/uc?id=1-2AUiHhVWCoI7q0eQquYJ54onWQ59TiF

RUN mkdir /models && \
    cd /models && \
    # download standard scaler model
    gdown ${STANDARD_SCALER_ADDRESS} && \
    # download model used for classification
    gdown ${MODEL_ADDRESS}

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "app.main:app", "--app-dir=apps/ml/src", "--host", "0.0.0.0"]
