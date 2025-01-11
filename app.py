from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from uuid import uuid4
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
import jwt
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
# db.init_app(app)
# server_session = Session(app) # only if the server-sided session is enabled

app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app)

db = SQLAlchemy(app)


with app.app_context():
    db.create_all()

# ---------------------------- Models (to be transfered to another file later for security reasons) -------------------------------
def get_uuid():
    return uuid4().hex

# test databse
class User(db.Model):
    __tablename__ = "users"
    companyID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# ---------------------------------------------------------------------------------------------------------

# retrieve test database REMOVE LATER
@app.route("/testDatabase", methods=["POST"])
def test_database():
    email = request.json["email"]
    user = User.query.filter_by(email=email).first()

    return jsonify({
        "email": user.email,
        "companyID": user.companyID,
    }) 

# company account database
class CompanyAccount(db.Model):
    __tablename__ = "companyaccount"
    companyId = db.Column(db.String(256), primary_key=True, unique=True)
    companyName = db.Column(db.String(256), unique=True)
    activeAccount = db.Column(db.String(256))
    carbonBalance = db.Column(db.String(256))
    cashBalance = db.Column(db.String(256))
    createdDatetime = db.Column(db.String(256))
    updatedDatetime = db.Column(db.String(256))

# outstanding request model
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



# retrieve company account
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

# retrieve all trades
@app.route("/trades", methods=["GET"])
def trades():
    
    # perform join query
    results = db.session.query(
        OutstandingRequest.id,
        OutstandingRequest.carbonUnitPrice,
        OutstandingRequest.carbonQuantity,
        OutstandingRequest.requestType,
        OutstandingRequest.createdDatetime,
        OutstandingRequest.updatedDatetime,
        CompanyAccount.companyName
    ).join(CompanyAccount, OutstandingRequest.companyId == CompanyAccount.companyId).all()

    # process results
    data = [
        {
            "id": result.id,
            "companyName": result.companyName,
            "carbonUnitPrice": result.carbonUnitPrice,
            "carbonQuantity": result.carbonQuantity,
            "requestType": result.requestType,
            "createdDatetime": result.createdDatetime,
            "updatedDatetime": result.updatedDatetime
        }
        for result in results
    ]
    
    # return all trades
    return jsonify(data), 200

# retrieve company trade request
@app.route("/companytraderequest", methods=["POST"])
def companytraderequest():
    # extract request data
    companyId = request.json["companyId"]
    
    # perform join query
    result = db.session.query(
        OutstandingRequest.id,
        OutstandingRequest.companyId,
        OutstandingRequest.requestorCompanyId,
        OutstandingRequest.carbonUnitPrice,
        OutstandingRequest.carbonQuantity,
        OutstandingRequest.requestReason,
        OutstandingRequest.requestStatus,
        OutstandingRequest.requestType,
        OutstandingRequest.createdDatetime,
        OutstandingRequest.updatedDatetime,
        CompanyAccount.companyName
    ).join(CompanyAccount, OutstandingRequest.companyId == CompanyAccount.companyId).filter(
        OutstandingRequest.companyId == companyId
    ).first()

    # handle cases where no result is found
    if result is None:
        return jsonify({"error": "No data found"}), 404

    # return company trade request
    return jsonify({
        "id": result.id,
        "companyName": result.companyName,
        "companyId": result.companyId,
        "requestorCompanyId": result.requestorCompanyId,
        "carbonUnitPrice": result.carbonUnitPrice,
        "carbonQuantity": result.carbonQuantity,
        "requestReason": result.requestReason,
        "requestStatus": result.requestStatus,
        "requestType": result.requestType,
        "createdDatetime": result.createdDatetime,
        "updatedDatetime": result.updatedDatetime
    })

# JWT version
@app.route("/@me", methods=["GET"])
@jwt_required()
def get_current_user():
    
    user_id = get_jwt_identity()
    user = User.query.filter_by(compandyID=user_id).first()
    
    return jsonify({
        "id": user.compandyID,
        "email": user.email
    }) 

# # Server-side version
# @app.route("/@me_server_side")
# def get_current_user_server_side():
    
#     companyID = session.get("company_id")

#     if not companyID:
#         return jsonify({"error": "Unauthorized"}), 401
    
#     user = User.query.filter_by(companyID=companyID).first()
#     return jsonify({
#         "id": user.companyID,
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


@app.route("/logout", methods=["POST"])
def logout_user():
    # TODO: add logout
    return "200"

@app.route("/create-request", methods=["POST"])
def create_request():
    data = request.json
    try:
        new_request = OutstandingRequest(
            id=data["id"],
            companyId=data["companyId"],
            requestorCompanyId=data["requestorCompanyId"],
            carbonUnitPrice=data["carbonUnitPrice"],
            carbonQuantity=data["carbonQuantity"],
            requestReason=data["requestReason"],
            requestStatus="pending",
            requestType=data["requestType"],
            createdDatetime=data.get("createdDatetime"),
            updatedDatetime=data.get("updatedDatetime")
        )
        db.session.add(new_request)
        db.session.commit()
        print("Request created successfully")
        return jsonify({"message": "Request created successfully"}), 201
    except Exception as e:
        print(f"Error creating request: {e}")
        db.session.rollback()
        return jsonify({"error": "Failed to create request"}), 500
    
        # Update the requestReceived table
        db.session.add(
            RequestReceived(
                id=new_request.id,
                companyId=data["companyId"],
                status="received",
                createdDatetime=data.get("createdDatetime"),
                updatedDatetime=data.get("updatedDatetime")
            )
        )
        db.session.commit()




        return jsonify({"message": "Request created successfully"}), 201

@app.route("/approve/<request_id>", methods=["PUT"])
def approveRequest(request_id):
    data = request.json
    outstanding_request = OutstandingRequest.query.filter_by(id=request_id).first()

    if not outstanding_request:
        return jsonify({"error": "Request not found"}), 404

    if outstanding_request.requestStatus != "Pending":
        return jsonify({"error": "Only pending requests can be approved"}), 400

    # Retrieve the company and requester accounts
    company_account = CompanyAccount.query.filter_by(companyId=outstanding_request.companyId).first()
    requester_account = CompanyAccount.query.filter_by(companyId=outstanding_request.requestorCompanyId).first()

    if not company_account or not requester_account:
        return jsonify({"error": "Company accounts not found"}), 404

    # Check if the requester has enough balance
    if requester_account.carbonBalance < outstanding_request.carbonQuantity:
        return jsonify({"warning": "Requester does not have enough carbon balance"}), 400

    # Approve the request and update balances
    try:
        company_account.carbonBalance -= outstanding_request.carbonQuantity
        company_account.cashBalance += float(outstanding_request.carbonUnitPrice) * float(outstanding_request.carbonQuantity)

        requester_account.carbonBalance += outstanding_request.carbonQuantity
        requester_account.cashBalance -= float(outstanding_request.carbonUnitPrice) * float(outstanding_request.carbonQuantity)

        # Update request status and timestamps
        outstanding_request.requestStatus = "Approved"
        outstanding_request.updatedDatetime = data.get("updatedDatetime")

        db.session.commit()

        return jsonify({"message": "Request approved successfully"}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error approving request: {e}")
        return jsonify({"error": "Failed to approve request"}), 500




# Edit an existing request
@app.route("/edit-request/<request_id>", methods=["PUT"])
def edit_request(request_id):
    data = request.json
    outstanding_request = OutstandingRequest.query.filter_by(id=request_id).first()

    if not outstanding_request:
        return jsonify({"error": "Request not found"}), 404

    # Update fields
    outstanding_request.carbonUnitPrice = data.get("carbonUnitPrice", outstanding_request.carbonUnitPrice)
    outstanding_request.carbonQuantity = data.get("carbonQuantity", outstanding_request.carbonQuantity)
    outstanding_request.requestReason = data.get("requestReason", outstanding_request.requestReason)
    outstanding_request.requestType = data.get("requestType", outstanding_request.requestType)
    outstanding_request.updatedDatetime = data.get("updatedDatetime")

    db.session.commit()
    return jsonify({"message": "Request updated successfully"}), 200

@app.route("/delete-request/<request_id>", methods=["DELETE"])
def delete_request(request_id):
    try:
        print("Request ID for deletion:", request_id)
        
        # Fetch the outstanding request by ID
        outstanding_request = OutstandingRequest.query.filter_by(id=request_id).first()
        
        # If the request doesn't exist, return an error
        if not outstanding_request:
            return jsonify({"error": "Request not found"}), 404

        # Delete the request
        db.session.delete(outstanding_request)
        db.session.commit()
        return jsonify({"message": "Request deleted successfully"}), 200
    
    except Exception as e:
        # Rollback the transaction in case of any errors
        db.session.rollback()
        print(f"An error occurred while deleting the request: {e}")
        return jsonify({"error": "An error occurred while deleting the request"}), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
