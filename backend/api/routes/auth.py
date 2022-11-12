from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
from helpers.validation import validate_account, check_user_exists
from sqlalchemy import text
from app.extensions import db


auth = Blueprint('auth', __name__, url_prefix='/auth')
flaskbcrypt = Bcrypt(current_app)

@auth.route("/register-first-step", methods=["POST"])
def register_user_first_step():
    try:
        email = request.json["email"]
        login = request.json["login"]
        password = request.json["password"]
    except KeyError:
        return jsonify({"error": 'All fields must be filled'})
    
    validation_result = validate_account(email, password, login)
    
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result}), 400
    
    already_exists = check_user_exists(login, email)
    
    if already_exists != "ALL_VALID":
        return jsonify({"error":already_exists}), 409
    
   
    return jsonify("ALL_VALID"), 200


@auth.route("/role")
def get_user_role():
    user_name = request.args.get("login", default="", type=str)
    
    with db.engine.connect() as connection:
        search_result = connection.execute(text('''
                                                SELECT rolname 
                                                FROM pg_authid 
                                                WHERE pg_has_role('{login}', pg_authid.oid, 'member') 
                                                AND pg_authid.rolname != '{login}';
                                                '''.format(login=user_name)))
        
        return [dict(row) for row in search_result][0]
    
