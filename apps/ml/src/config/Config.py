import os


class Config:
    SAMPLING_FREQUENCY = int(os.getenv("SAMPLING_FREQUENCY", 25))
    WINDOW_SECONDS = int(os.getenv("WINDOW_SECONDS", 10))
    CONFIG_BASE_PATH = os.getenv("CONFIG_BASE_PATH", "./apps/ml/src/config")
    MODELS_PATH = os.getenv("MODELS_PATH", "/models")
    REDIS_HOST = os.getenv("REDIS_HOST", "redis123132123132")
    SESSION_EXPIRE_SECONDS = int(os.getenv("SESSION_EXPIRE_SECONDS", 300))
