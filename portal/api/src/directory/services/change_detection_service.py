from typing import List

import src.directory.repositories.banner_employee_repository as banner_employee_repository
import src.directory.repositories.portal_employee_repository as portal_employee_repository
import src.directory.repositories.pending_change_repository as pending_change_repository
import src.directory.repositories.historical_change_repository as historical_change_repository

import src.directory.helpers.change_detection_helper as change_detection_helper

from src.directory.models.employee import Employee
from src.directory.models.pending_change import PendingChange

def detect_and_commit_changes():
    banner_employees: List[Employee] = banner_employee_repository.get_banner_employees()
    portal_employees: List[Employee] = portal_employee_repository.get_portal_employees()

    grouped_employee_entries = change_detection_helper.group_banner_and_portal_employee_entries(banner_employees, portal_employees)

    all_pending_changes: List[PendingChange] = []

    for banner_employee, portal_employee in grouped_employee_entries:
        
        all_changes = change_detection_helper.get_changes_between_banner_and_portal_employee(banner_employee, portal_employee)
        historical_changes = historical_change_repository.get_historical_changes_by_badger_id(banner_employee.ID)

        employee_pending_changes = [
            pending_change for pending_change 
            in all_changes 
            if not change_detection_helper.historical_change_exists_for_pending_change(pending_change, historical_changes)
        ]

        all_pending_changes = [*all_pending_changes, *employee_pending_changes]

    pending_change_repository.insert_pending_changes(all_pending_changes)

