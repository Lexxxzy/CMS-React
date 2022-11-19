import hashlib
from helpers.constants import ADMIN_TABLES, MANAGER_TABLES, EMPLOYEE_TABLES


def check_password_hash(entered_password, actual_password_hash):
    hashed_password = hash_password(entered_password)

    if (hashed_password != actual_password_hash):
        return "Wrong credentials"

    return "ALL_VALID"


def hash_password(entered_password):
    m = hashlib.sha512()
    m.update(entered_password.encode("utf8"))

    return m.hexdigest()


def get_available_tables(role):
    if role == "db_admin":
        return ADMIN_TABLES

    elif role == "manager":
        return MANAGER_TABLES

    elif role == "employee":
        return EMPLOYEE_TABLES
