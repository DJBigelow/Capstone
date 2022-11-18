from sys import prefix
from fastapi import (
    APIRouter
)
from src.directory.models.employee import Employee

from src.directory.repositories.portal_employee_repository import (
    get_portal_employees,
    get_employee_by_id,
    update_employee
)

router = APIRouter(
    prefix="/employees",
    responses={404: {"description": "Not found"}}
)

@router.get("/get-all")
def get_all_employees():
    employees = get_portal_employees()
    return {"success": True, "employees": employees}

@router.get("/get-by-id/{employee_id}")
def get_by_id(employee_id: str):
    employee = get_employee_by_id(employee_id)
    return {"success": True, "employee": employee}

@router.post("/update")
def update_employee_post(employee: Employee):
    update_employee(employee)

    return {"success": True}