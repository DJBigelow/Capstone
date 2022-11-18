from src.common.services.banner_db_service import __execute_sql__

def get_departments():

    sql = """
        SELECT DEPT_CODE, DEPT_DESC
        FROM DEPARTMENT
    """

    departments = __execute_sql__(sql, None)

    return departments