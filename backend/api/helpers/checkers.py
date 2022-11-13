import hashlib

def check_password_hash(entered_password, actual_password_hash):
    hashed_password = hash_password(entered_password)
    
    if(hashed_password!=actual_password_hash):
        return "Wrong credentials"
    
    return "ALL_VALID"

def hash_password(entered_password):
    m = hashlib.sha512()
    m.update(entered_password.encode("utf8"))
    
    return m.hexdigest()