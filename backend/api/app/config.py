from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    APPLICATION_ROOT = "/api"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SESSION_TYPE = "redis"
    SESSION_PERMAMENT = False
    SESSION_USE_SIGNER = True
    
    # DEV
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres:{os.environ['POSTGRES_PASSWORD']}@localhost:5432/{os.environ['POSTGRES_DB']}"