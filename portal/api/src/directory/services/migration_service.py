from enum import unique
from typing import List

from src.directory.repositories.banner_employee_repository import get_banner_employees
from src.directory.repositories.portal_employee_repository import (
    insert_employees
)

from src.directory.models.employee import Employee

def migrate_employees():
    banner_employees = get_banner_employees()
    insert_employees(banner_employees)


