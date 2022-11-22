from flask import Blueprint, request, jsonify, current_app, session
from helpers.validation import validate_account, check_mail, check_user_exists, validate_role, validate_name, validate_input, validate_documents
from sqlalchemy import text
from app.extensions import db
from helpers.checkers import get_available_tables
from helpers.searchers import get_user_password, get_user_login
from routes.auth import get_user_role

cms = Blueprint('cms', __name__, url_prefix="/cms")


@cms.route("/get-tables")
def get_tables():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"}), 401

    user_role = get_user_role()['rolname']
    tables = get_available_tables(user_role)

    return jsonify(tables)


@cms.route("/get-tasks")
def get_tasks():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"}), 401

    if get_user_role()['rolname'] == "db_admin":
        user_login = "db_admin"

    try:
        with db.engine.connect() as connection:
            all_tasks = connection.execute(text('''
                                            SET ROLE {login};
                                            SELECT 
                                                t.task_id::varchar(10) AS id,
                                                t.task_type AS title,
                                                t.contract,
                                                t.task_status,
                                                t.task_priority AS priority,
                                                TO_CHAR(t.creation_date, 'dd.mm.yyyy') AS from_date,
                                                TO_CHAR(t.due_date, 'dd.mm.yyyy') AS to_date,
                                                CONCAT(rep.surname, ' ', SUBSTRING(rep.name,1,1), '. ', SUBSTRING(rep.middle_name,1,1), '.') AS representative,
                                                CONCAT(executor.surname, ' ', SUBSTRING(executor.name,1,1), '. ', SUBSTRING(executor.middle_name,1,1), '.') AS executor,
                                                CONCAT(author.surname, ' ', SUBSTRING(author.name,1,1), '. ', SUBSTRING(author.middle_name,1,1), '.') AS author
                                            FROM public.task t
                                            JOIN public.employee author
                                                ON t.author = author.passport
                                            JOIN public.employee executor
                                                ON t.executor = executor.passport
                                            JOIN public.company_representative rep
                                                ON t.company_representative = rep.tin;
                                            '''.format(login=user_login)))

            completed_tasks = []
            not_completed_tasks = []

            for row in all_tasks:
                obj = dict(row)

                if obj['task_status'] == True:
                    completed_tasks.append(obj)
                else:
                    not_completed_tasks.append(obj)

            return jsonify([{
                'id': "1",
                'title': 'In progress',
                'tasks': not_completed_tasks
            },
                {
                'id': "2",
                'title': 'Done',
                'tasks': completed_tasks
            }])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/user-info')
def get_user_info():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    try:
        with db.engine.connect() as connection:
            user_info = connection.execute(text('''
                                                    SELECT 
                                                        CONCAT(surname, ' ', name, ' ', middle_name) AS full_name,
                                                        position,
                                                        email,
                                                        tin,
                                                        login,
                                                        passport,
                                                        CONCAT('₽', CAST(salary AS varchar)) AS salary,
                                                        age
                                                    FROM employee
                                                    WHERE login='dh';
                                                    '''.format(login=user_login)))

            return jsonify([dict(row) for row in user_info])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/employees')
def get_employees():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    if get_user_role()['rolname'] == "db_admin":
        user_login = "db_admin"

    try:
        with db.engine.connect() as connection:
            employees = connection.execute(text('''
                                                    SET ROLE {login};

                                                    SELECT 
                                                        name,
                                                        middle_name,
                                                        surname,
                                                        login,
                                                        position,
                                                        email,
                                                        passport,
                                                        tin,
                                                        salary 
                                                    FROM employee;
                                                    '''.format(login=user_login)))

            return jsonify([dict(row) for row in employees])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/representatives')
def get_representatives():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    if get_user_role()['rolname'] == "db_admin":
        user_login = "db_admin"

    try:
        with db.engine.connect() as connection:
            representatives = connection.execute(text('''
                                                    SET ROLE {login};

                                                    SELECT 
                                                        name,
                                                        middle_name,
                                                        surname,
                                                        position,
                                                        email,
                                                        org.org_title AS organization,
                                                        tin,
                                                        rep_phone_number AS phone,
                                                        rep_internal_number AS internal_phone,
                                                        age
                                                    FROM company_representative rep
                                                    JOIN public.organization org
                                                    ON rep.organization = org.tax_id_number;
                                                    '''.format(login=user_login)))

            return jsonify([dict(row) for row in representatives])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/analytics')
def get_analytics():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    if get_user_role()['rolname'] == "db_admin":
        user_login = "db_admin"
    else:
        return jsonify({"error": "Forbidden"}), 403

    try:
        with db.engine.connect() as connection:
            recent_tasks = connection.execute(text('''
                                                    SET ROLE {login};
                                                    SELECT 
                                                        task_status AS is_ready,
                                                        task_type,
                                                        TO_CHAR(creation_date, 'dd MON HH24:MI') AS date
                                                    FROM task
                                                    ORDER BY creation_date DESC
                                                    LIMIT 5;
                                                    '''.format(login=user_login)))

            overall_stats = connection.execute(text('''
                                                    SET ROLE {login};
                                                    SELECT  (
                                                            SELECT COUNT(1)
                                                            FROM employee
                                                            ) AS employee_count,
                                                            (
                                                            SELECT COUNT(1)
                                                            FROM organization
                                                            ) AS organization_count,
                                                            (
                                                            SELECT COUNT(1)
                                                            FROM task
                                                            WHERE task_status=true
                                                            ) AS done_task_count,
                                                            (
                                                            SELECT COUNT(1)
                                                            FROM task
                                                            WHERE task_status=false
                                                            ) AS in_progress_task_count,
                                                            (
                                                            SELECT COUNT(1)
                                                            FROM task
                                                            ) AS task_count;
                                                    '''.format(login=user_login)))
            tasks = [dict(row) for row in recent_tasks]
            stats = [dict(row) for row in overall_stats]
            return jsonify({'recent_tasks': tasks, 'overall_stats': stats[0]})

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/customers')
def get_cutomers():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    if get_user_role()['rolname'] == "db_admin":
        user_login = "db_admin"

    try:
        with db.engine.connect() as connection:
            cutomers = connection.execute(text('''
                                               SET ROLE {login};
                                                SELECT 
                                                    org.*, 
                                                    postal.*, 
                                                    CONCAT(rep.surname, ' ', SUBSTRING(rep.name,1,1), '. ', SUBSTRING(rep.middle_name,1,1), '.') AS representative
                                                FROM organization org
                                                JOIN postal_info postal 
                                                ON postal.postal_info_id = org.postal_info_id
                                                JOIN company_representative rep
                                                ON rep.organization = org.tax_id_number;
                                                '''.format(login=user_login)))

            return jsonify([dict(row) for row in cutomers])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/representative-names')
def get_rep_names():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    try:
        with db.engine.connect() as connection:
            reps = connection.execute(text('''
                                               SELECT 
                                                    CONCAT(rep.surname, ' ', SUBSTRING(rep.name,1,1), '. ', SUBSTRING(rep.middle_name,1,1), '.') AS full_name,
                                                    org.org_title,
                                                    tin
                                                FROM public.company_representative rep
                                                JOIN organization org
                                                ON org.tax_id_number = rep.organization;
                                                '''))

            return jsonify([dict(row) for row in reps])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/employees-names')
def get_emp_names():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    try:
        with db.engine.connect() as connection:
            emps = connection.execute(text('''
                                               SELECT 
                                                    CONCAT(emp.surname, ' ', SUBSTRING(emp.name,1,1), '. ', SUBSTRING(emp.middle_name,1,1), '.') AS full_name,
                                                    passport
                                                FROM public.employee emp;
                                                '''))

            return jsonify([dict(row) for row in emps])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@cms.route('/contacts-ids')
def get_contact_ids():
    user_login = session.get("user_id")

    if not user_login:
        return jsonify({"error": "Unauthorized"})

    try:
        with db.engine.connect() as connection:
            emps = connection.execute(
                text('''SELECT contract_id FROM public.contract;'''))

            return jsonify([dict(row)["contract_id"] for row in emps])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500
