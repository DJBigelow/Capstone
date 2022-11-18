from typing import List
from src.directory.models.employee import Employee
from src.common.services.portal_db_service import (
    run_sql,
)


def get_portal_employees() -> List[Employee]:
    sql = """
        SELECT * FROM employee
    """

    employees = run_sql(sql, output_class=Employee)

    return employees


def get_employee_by_id(id: str) -> Employee:
    sql = """
        SELECT * FROM employee
        WHERE "ID" = %(id)s
    """

    params = {"id": id}

    employee = run_sql(sql, params, output_class=Employee)[0]

    return employee


def update_employee(updated_employee: Employee):
    sql = """
        UPDATE employee
        SET 
            "DISP_FIRST_NAME" = %(DISP_FIRST_NAME)s,
            "FIRST_NAME" = %(FIRST_NAME)s,
            "PREF_NAME" = %(PREF_NAME)s,
            "MI" = %(MI)s,
            "LAST_NAME" = %(LAST_NAME)s,
            "SNOW_EMAIL" = %(SNOW_EMAIL)s,
            "POSN" = %(POSN)s,
            "POSITION" = %(POSITION)s,
            "DEPT_CODE" = %(DEPT_CODE)s,
            "DEPT_DESC" = %(DEPT_DESC)s,
            "CAMPUS" = %(CAMPUS)s,
            "OFFICE_BLDG_CODE" = %(OFFICE_BLDG_CODE)s,
            "BUILDING_DESC" = %(BUILDING_DESC)s,
            "OFFICE_ROOM" = %(OFFICE_ROOM)s,
            "OFFICE_AREA" = %(OFFICE_AREA)s,
            "OFFICE_PHONE" = %(OFFICE_PHONE)s
        WHERE "ID" = %(ID)s
    """

    params = updated_employee.dict()

    run_sql(sql, params)


def insert_employees(employees: List[Employee]):
    sql = """
        INSERT INTO employee (
            "ID", 
            "DISP_FIRST_NAME",
            "FIRST_NAME",
            "PREF_NAME",
            "MI",
            "LAST_NAME",
            "SNOW_EMAIL",
            "POSN",
            "POSITION",
            "DEPT_CODE",
            "DEPT_DESC",
            "CAMPUS",
            "OFFICE_BLDG_CODE",
            "BUILDING_DESC",
            "OFFICE_ROOM",
            "OFFICE_AREA",
            "OFFICE_PHONE"
        )
        VALUES (
            %(ID)s,
            %(DISP_FIRST_NAME)s,
            %(FIRST_NAME)s,
            %(PREF_NAME)s,
            %(MI)s,
            %(LAST_NAME)s,
            %(SNOW_EMAIL)s,
            %(POSN)s,
            %(POSITION)s,
            %(DEPT_CODE)s,
            %(DEPT_DESC)s,
            %(CAMPUS)s,
            %(OFFICE_BLDG_CODE)s,
            %(BUILDING_DESC)s,
            %(OFFICE_ROOM)s,
            %(OFFICE_AREA)s,
            %(OFFICE_PHONE)s
        )
    """

    for employee in employees:
        run_sql(sql, employee.dict())
