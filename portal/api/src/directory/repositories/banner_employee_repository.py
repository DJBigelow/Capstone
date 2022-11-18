from src.common.services.banner_db_service import __execute_sql__
from src.directory.models.employee import Employee

def get_banner_employees():
    # There are multiple entries with the same ID in SUM_VIEW, so this query takes whichever entry has the highest ID_SEQ
    sql = """
        SELECT 
            SUM_VIEW.ID, 
            SUM_VIEW.DISP_FIRST_NAME,
            SUM_VIEW.FIRST_NAME,
            SUM_VIEW.PREF_NAME,
            SUM_VIEW.MI,
            SUM_VIEW.LAST_NAME,
            SUM_VIEW.SNOW_EMAIL,
            SUM_VIEW.POSN,
            SUM_VIEW.POSITION,
            SUM_VIEW.DEPT_CODE,
            SUM_VIEW.DEPT_DESC,
            SUM_VIEW.CAMPUS,
            SUM_VIEW.OFFICE_BLDG_CODE,
            SUM_VIEW.BUILDING_DESC,
            SUM_VIEW.OFFICE_ROOM,
            SUM_VIEW.OFFICE_AREA,
            SUM_VIEW.OFFICE_PHONE
        FROM EMPLOYEE_VIEW
        JOIN (
            SELECT ID, MAX(ID_SEQ) AS MAX_ID_SEQ
            FROM EMPLOYEE_VIEW
            GROUP BY ID
        ) ID_SEQS
        ON SUM_VIEW.ID = ID_SEQS.ID AND (ID_SEQS.MAX_ID_SEQ IS NULL OR SUM_VIEW.ID_SEQ = ID_SEQS.MAX_ID_SEQ)
    """

    # Banner service converts rows to dicts before returning them
    employee_dicts = __execute_sql__(sql, None)

    employees = [Employee.parse_obj(employee_dict) for employee_dict in employee_dicts]

    return employees

def get_banner_employee_by_id(badger_id: str) -> Employee:
    sql = """
        SELECT 
            ID, 
            DISP_FIRST_NAME, 
            FIRST_NAME, 
            PREF_NAME,
            MI,
            LAST_NAME,
            SNOW_EMAIL,
            POSN,
            POSITION,
            DEPT_CODE,
            DEPT_DESC,
            CAMPUS,
            OFFICE_BLDG_CODE,
            BUILDING_DESC,
            OFFICE_ROOM,
            OFFICE_AREA,
            OFFICE_PHONE
        FROM EMPLOYEE_VIEW
        WHERE ID = %(ID)s
    """

    employee_dict = __execute_sql__(sql, {"ID": badger_id})
    employee = Employee.parse_obj(employee_dict)
    
    return employee