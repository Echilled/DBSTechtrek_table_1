from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    USER_NAME = os.environ["USERNAME"]
    PASS_WORD = os.environ["PASSWORD"]
    HOST = os.environ["HOST"]
    DB_NAME = os.environ["DB_NAME"]
    

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"mysql://" + USER_NAME + ":" + PASS_WORD + "@" + HOST + "/" + DB_NAME

    # Login Session
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")