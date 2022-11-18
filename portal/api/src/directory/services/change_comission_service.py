from datetime import datetime
from typing import List
from src.directory.models.employee import Employee
from src.directory.models.historical_change import HistoricalChange

from src.directory.repositories.historical_change_repository import (
    insert_historical_change,
)

from src.directory.repositories.pending_change_repository import (
    get_pending_change_by_id,
    remove_pending_change,
)


from src.directory.repositories.portal_employee_repository import (
    get_employee_by_id,
    update_employee,
)


def commit_change_approval(approvedChangeId: int):
    approved_change = get_pending_change_by_id(approvedChangeId)

    historical_change = HistoricalChange(
        badger_id=approved_change.badger_id,
        approval_time=datetime.utcnow(),
        portal_column=approved_change.portal_column,
        banner_value=approved_change.banner_value,
        portal_value=approved_change.portal_value,
    )

    insert_historical_change(historical_change)

    remove_pending_change(approved_change)


def commit_change_denial(deniedChanegId: int):
    deniedChange = get_pending_change_by_id(deniedChanegId)

    portalEmployee = get_employee_by_id(deniedChange.badger_id)

    employee_dict = portalEmployee.dict()

    employee_dict[deniedChange.portal_column] = deniedChange.banner_value

    updated_employee = Employee.parse_obj(employee_dict)

    update_employee(updated_employee)

    remove_pending_change(deniedChange)