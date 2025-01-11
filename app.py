from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
# from models import db, User, Books
from uuid import uuid4
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
import mysql.connector
import os
from dotenv import load_dotenv
from auth_middleware import token_required

load_dotenv()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app) #only if the server-sided session is enabled
# db.init_app(app)


SECRET_KEY = os.environ["SECRET_KEY"]
app.config['SECRET_KEY'] = SECRET_KEY
USER_NAME = os.environ["USER_NAME"]
PASS_WORD = os.environ["PASS_WORD"]
HOST= os.environ["HOST"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET_KEY = os.environ["JWT_SECRET"]
JWT_TOKEN_LCOATION = ['headers']

jwt = JWTManager(app)

db = SQLAlchemy(app)
app.config['JWT_TOKEN_LOCATION'] = ['headers']


with app.app_context():
    db.create_all()

# ---------------------------- Models (to be transfered to another file later) -------------------------------
def get_uuid():
    return uuid4().hex

# test databse REMOVE LATER
class User(db.Model):
    __tablename__ = "users"
    companyID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# company account databse REMOVE LATER
class CompanyAccount(db.Model):
    __tablename__ = "companyaccount"
    companyId = db.Column(db.String(256), primary_key=True, unique=True)
    companyName = db.Column(db.String(256), unique=True)
    activeAccount = db.Column(db.String(256))
    carbonBalance = db.Column(db.String(256))
    cashBalance = db.Column(db.String(256))
    createdDatetime = db.Column(db.String(256))
    updatedDatetime = db.Column(db.String(256))

# retrieve test database REMOVE LATER
@app.route("/testDatabase", methods=["POST"])
def test_database():
    email = request.json["email"]
    user = User.query.filter_by(email=email).first()

    return jsonify({
        "email": user.email,
        "companyID": user.companyID,
    }) 


# retrieve company account REMOVE LATER
@app.route("/companyaccount", methods=["POST"])
def retrieve_companyaccount():
    companyId = request.json["companyId"]
    companyaccount = CompanyAccount.query.filter_by(companyId=companyId).first()

    return jsonify({
        "companyId": companyaccount.companyId,
        "companyName": companyaccount.companyName,
        "activeAccount": companyaccount.activeAccount,
        "carbonBalance": companyaccount.carbonBalance,
        "cashBalance": companyaccount.cashBalance,
        "createdDatetime": companyaccount.createdDatetime,
        "updatedDatetime": companyaccount.updatedDatetime
    }) 

# outstanding request databse REMOVE LATER
class OutstandingRequest(db.Model):
    __tablename__ = "outstandingrequest"
    id = db.Column(db.String(256), primary_key=True, unique=True)
    companyId = db.Column(db.String(256), unique=True)
    requestorCompanyId = db.Column(db.String(256), unique=True)
    carbonUnitPrice = db.Column(db.String(256))
    carbonQuantity = db.Column(db.String(256))
    requestReason = db.Column(db.String(256))
    requestStatus = db.Column(db.String(256))
    requestType = db.Column(db.String(256))
    createdDatetime = db.Column(db.String(256))
    updatedDatetime = db.Column(db.String(256))

# retrieve outstanding request REMOVE LATER
@app.route("/outstandingrequest", methods=["POST"])
def outstandingrequest():
    id = request.json["id"]
    outstandingrequest = OutstandingRequest.query.filter_by(id=id).first()

    return jsonify({
        "id": outstandingrequest.id,
        "companyId": outstandingrequest.companyId,
        "requestorCompanyId": outstandingrequest.requestorCompanyId,
        "carbonUnitPrice": outstandingrequest.carbonUnitPrice,
        "carbonQuantity": outstandingrequest.carbonQuantity,
        "requestReason": outstandingrequest.requestReason,
        "requestStatus": outstandingrequest.requestStatus,
        "requestType": outstandingrequest.requestType,
        "createdDatetime": outstandingrequest.createdDatetime,
        "updatedDatetime": outstandingrequest.updatedDatetime
    }) 

# JWT version
@app.route("/@me", methods=["POST"])
#def get_current_user(current_user):
   # return jsonify(current_user)

    # user_id = get_jwt_identity()
    
    # if not user_id:
    #     return jsonify({"error123": "it is jumping here directly"}), 401


    # user = User.query.filter_by(id=user_id).first()
    
    # return jsonify({
    #     "name": user.name,
    #     "id": user.id,
    #     "email": user.email
    # }) 

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

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.companyID)
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
