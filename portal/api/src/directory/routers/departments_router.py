from typing import Dict
from fastapi import (
    APIRouter
)

from src.directory.repositories.banner_department_repository import (
    get_departments
)

router = APIRouter(
    prefix="/departments",
)

@router.get("/get-all")
def get_all_departments():
    departments = get_departments()
    formatted_departments = format_departments(departments)
    return {"success": True, "departments": formatted_departments}

def format_departments(departments):
    formatted_departments = [
        department["DEPT_DESC"]
        for department in departments
    ]

    return formatted_departments 