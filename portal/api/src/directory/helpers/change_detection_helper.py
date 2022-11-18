from typing import Any, Dict, List

from src.directory.models.employee import Employee
from src.directory.models.pending_change import PendingChange
from src.directory.models.historical_change import HistoricalChange

def group_banner_and_portal_employee_entries(banner_employees: List[Employee], portal_employees: List[Employee]):
   
    grouped_employees = [
        (banner_emp, portal_emp)
        for banner_emp in banner_employees 
        for portal_emp in portal_employees
        if banner_emp.ID == portal_emp.ID
    ]

    return grouped_employees

def get_banner_employees_not_in_portal(banner_employees: List[Employee], portal_employees: List[Employee]):
    portal_employee_ids = [emp.ID for emp in portal_employees]
    return [banner_emp for banner_emp in banner_employees if banner_emp.ID not in portal_employee_ids]

def get_portal_employees_not_in_banner(banner_employees: List[Employee], portal_employees: List[Employee]):
    banner_employee_ids = [emp.ID for emp in banner_employees]
    return [portal_emp for portal_emp in portal_employees if portal_emp.ID not in banner_employee_ids]


def get_changes_between_banner_and_portal_employee(banner_employee: Employee, portal_employee: Employee):

    banner_emp_dict = banner_employee.dict()
    portal_emp_dict = portal_employee.dict()

    # print(banner_emp_dict)
    # print(portal_emp_dict)

    employee_columns = list(banner_employee.dict().keys())

    change_list: List[PendingChange] = []
    
    for column in employee_columns:
        if str(banner_emp_dict[column]) != str(portal_emp_dict[column]):
            print(portal_emp_dict)
            print(banner_emp_dict)

            pending_change = PendingChange(
                badger_id = banner_employee.ID,
                portal_column = column,
                banner_value = str(banner_emp_dict[column]),
                portal_value = str(portal_emp_dict[column])
            )

            change_list.append(pending_change)
    
    return change_list


def historical_change_exists_for_pending_change(pending_change: PendingChange, historical_changes: List[HistoricalChange]) -> bool:
    return any([
            historical_change_covers_pending_change(pending_change, historical_change) 
            for historical_change in historical_changes
        ]
    )
    

def historical_change_covers_pending_change(pending_change: PendingChange, historical_change: HistoricalChange) -> bool:
    return (pending_change.portal_column == historical_change.portal_column and 
            pending_change.banner_value == historical_change.banner_value and
            pending_change.portal_value == historical_change.portal_value)



