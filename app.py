from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
# from models import db, User
from uuid import uuid4
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app) #only if the server-sided session is enabled
# db.init_app(app)


SECRET_KEY = os.environ["SECRET_KEY"]
USER_NAME = os.environ["USER_NAME"]
PASS_WORD = os.environ["PASS_WORD"]
HOST= os.environ["HOST"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET_KEY = os.environ["JWT_SECRET"]

jwt = JWTManager(app)

db = SQLAlchemy(app)
app.config['JWT_TOKEN_LOCATION'] = ['headers']


with app.app_context():
    db.create_all()

# ---------------------------- Models (to be transfered to another file later) -------------------------------
def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    companyID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host=app.config['HOST'],
        user=app.config['USER_NAME'],
        password=app.config['PASS_WORD'],
        database=app.config['DB_NAME']
    )

# Test databse REMOVE LATER
@app.route("/testDatabase", methods=["POST"])
def test_database():
    email = request.json["email"]
    user = User.query.filter_by(email=email).first()

    return jsonify({
        "email": user.email,
        "companyID": user.companyID,
    }) 



# JWT version
@app.route("/@me")
def get_current_user():

    user_id = get_jwt_identity()
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401


    user = User.query.filter_by(id=user_id).first()
    
    return jsonify({
        "name": user.name,
        "id": user.id,
        "email": user.email
    }) 

# Server-side version
# @app.route("/@me")
# def get_current_user():

    
#     user_id = session.get("user_id")

#     if not user_id:
#         return jsonify({"error": "Unauthorized"}), 401
    
#     user = User.query.filter_by(id=user_id).first()
#     return jsonify({
#         "name": user.name,
#         "id": user.id,
#         "email": user.email
#     }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    companyID = request.json["companyID"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = str(bcrypt.generate_password_hash(password).decode('utf-8'))

    #  # Insert into the database
    # conn = get_db_connection()
    # cursor = conn.cursor()
    # try:
    #     cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
    #     conn.commit()
    # except mysql.connector.errors.IntegrityError:
    #     return jsonify({"error": "Email already exists"}), 409
    # finally:
    #     cursor.close()
    #     conn.close()

    # hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(companyID = companyID, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    

    return jsonify({
        "email": new_user.email,
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401


    if user and str(bcrypt.generate_password_hash(password).decode('utf-8'))==user.password:
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401

    # auto return a cookie too
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    # TODO: add logout
    return "200"

if __name__ == "__main__":
    app.run(debug=True)