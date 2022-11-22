from flask import Blueprint, request, jsonify, current_app, session
from flask_bcrypt import Bcrypt
from helpers.validation import validate_account, check_mail, check_user_exists, validate_role, validate_name, validate_input, validate_documents
from sqlalchemy import text
from app.extensions import db
from helpers.checkers import check_password_hash, hash_password
from helpers.searchers import get_user_password, get_user_login

auth = Blueprint('auth', __name__)
flaskbcrypt = Bcrypt(current_app)


@auth.route("/auth/register-first-step", methods=["POST"])
def register_user_first_step():
    try:
        email = request.json["email"]
        login = request.json["login"]
        password = request.json["password"]
        confirm_password = request.json["confirmPassword"]
        role = request.json["role"]
        
        
    except KeyError:
        return jsonify({"error": 'All fields must be filled'})

    validation_result = validate_account(email, password, login)
    print("valid: ", validation_result)
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    if (password!=confirm_password):
        return jsonify({"error": "Passwords must match"})
    
    already_exists = check_user_exists(login, email)

    if already_exists != "ALL_VALID":
        return jsonify({"error": already_exists})

    role = validate_role(role)

    if role == "Invalid value":
        return jsonify({"error": "Invalid role value"})

    return jsonify("ALL_VALID")


@auth.route("/auth/register-final", methods=["POST"])
def register_user():
    try:
        email = request.json["email"]
        login = request.json["login"]
        password = request.json["password"]
        role = request.json["role"]

        name = request.json["name"]
        surname = request.json["surname"]
        middle_name = request.json["middle_name"]
        position = request.json["position"]
        tin = request.json["tin"]
        passport = request.json["passport"]
    except KeyError:
        return jsonify({"error": 'All fields must be filled'})

    validation = validate_account(email, password, login)

    if validation != "ALL_VALID":
        return jsonify({"error": validation})

    validation = check_user_exists(login, email)

    if validation != "ALL_VALID":
        return jsonify({"error": validation})

    validation = validate_role(role)

    if validation == "Invalid value":
        return jsonify({"error": "Invalid role value"})
    role = validation

    validation = validate_name(name, surname, middle_name)

    if validation != "ALL_VALID":
        return jsonify({"error": validation})

    validation = validate_input(position)

    if validation != "ALL_VALID":
        return jsonify({"error": "Invalid position value"})

    validation = validate_documents(tin, passport)

    if validation != "ALL_VALID":
        return jsonify({"error": validation})

    hashed_password = hash_password(password)

    try:
        with db.engine.connect() as connection:
            create_user = connection.execute(text('''
                                                    CREATE USER {login}
                                                    WITH PASSWORD '{password}'
                                                    IN ROLE {role};
                                                    INSERT INTO public.employee
                                                    VALUES ('{name}','{surname}','{middle_name}','{position}','{email}','{tin}','{passport}','{login}','{password}',NULL,NULL);
                                                    '''.format(login=login, email=email, role=role, name=name, surname=surname, middle_name=middle_name, tin=tin, passport=passport, password=hashed_password, position=position)))
            session["user_id"] = login

    except Exception:
        return jsonify({"error": "Some error occured"}), 500

    return jsonify("ALL_VALID"), 200


@auth.route("/auth/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    try:
        email = request.json["email"]
        password = request.json["password"]
    except KeyError:
        return jsonify({"error": 'All fields must be filled'})

    validation = check_mail(email)

    if not validation:
        return jsonify({"error": "Invalid input"})

    validation = check_password_hash(password, get_user_password(email))

    if (validation != 'ALL_VALID'):
        return jsonify({"error": validation})

    session["user_id"] = get_user_login(email)

    return {"email": email}


@auth.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


@auth.route("/@me")
def get_user():
    user_login = session.get("user_id")
    print(session.get("user_id"))
    if not user_login:
        return jsonify({"error": "Unauthorized"})

    return {'login': user_login}


@auth.route("/@me/role")
def get_user_role():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    with db.engine.connect() as connection:
        search_result = connection.execute(text('''
                                                SELECT rolname
                                                FROM pg_authid
                                                WHERE pg_has_role('{login}', pg_authid.oid, 'member')
                                                AND pg_authid.rolname != '{login}';
                                                '''.format(login=user_login)))

        return [dict(row) for row in search_result][0]
