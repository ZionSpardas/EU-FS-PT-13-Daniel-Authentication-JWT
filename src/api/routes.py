from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None or email == "" or password == "":
        return jsonify({"msg": "Bad username or password"}), 401

    # Check credentials (you should validate against your user database)
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)

    return jsonify({"msg": "Bad username or password"}), 401

@api.route('/signup', methods=['POST'])
def signup():
    # Process the information coming from the client
    user_data = request.get_json()
    print(user_data)

    # We create an instance without being recorded in the database
    user = User()
    user.email = user_data["email"]
    user.password = user_data["password"]
    user.confirm_password = user_data["confirmPassword"]
    user.is_active = True

    if not (user.email and user.password and user.confirm_password):
        return jsonify({'message': 'All fields are required'}), 400
    
    # Check if passwords match
    if (user.password != user.confirm_password):
        return jsonify({'error': 'Password and Confirm Password do not match'}), 400


    # We tell the database we want to record this user and execute the command provided
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
