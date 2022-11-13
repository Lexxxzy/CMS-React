from app.extensions import db
from sqlalchemy import text


def get_user_password(email):
    with db.engine.connect() as connection:
        search_result = connection.execute(text('''
                                                SELECT password 
                                                FROM public.employee 
                                                WHERE email='{email}';
                                                '''.format(email=email)))
        
        result_arr = [dict(row) for row in search_result]
        
        if len(result_arr) == 0:
            return "User is not exists"
        
        return result_arr[0]['password']
    
def get_user_login(email):
    with db.engine.connect() as connection:
        search_result = connection.execute(text('''
                                                SELECT login 
                                                FROM public.employee 
                                                WHERE email='{email}';
                                                '''.format(email=email)))
        
        result_arr = [dict(row) for row in search_result]
        
        if len(result_arr) == 0:
            return "User is not exists"
        
        return result_arr[0]['login']