from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    USER_NAME = os.environ["USER_NAME"]
    PASS_WORD = os.environ["PASS_WORD"]
    HOST = os.environ["HOST"]
    PORT = os.environ["PORT"]
    DB_NAME = os.environ["DB_NAME"]
    JWT_SECRET_KEY = os.environ["JWT_SECRET"]
    JWT_TOKEN_LOCATION = ['headers']
    

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"mysql://" + USER_NAME + ":" + PASS_WORD + "@" + HOST +":" + PORT+ "/" + DB_NAME

    # Login Session
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")