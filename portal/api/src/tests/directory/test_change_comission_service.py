from datetime import datetime
from typing import List
import pytest

from src.common.services.portal_db_service import run_sql
from src.directory.models.historical_change import HistoricalChange
from src.directory.models.pending_change import PendingChange
from src.directory.models.employee import Employee

from src.directory.repositories.portal_employee_repository import (
    get_employee_by_id,
    insert_employees
)

from src.directory.repositories.historical_change_repository import (
    get_historical_changes_by_badger_id
)

from src.directory.repositories.pending_change_repository import (
    get_pending_changes,
    get_pending_change_by_id,
    insert_pending_changes
)

from src.directory.services.change_comission_service import (
    commit_change_approval,
    commit_change_denial
)


### FIXTURES ###



@pytest.fixture()
def portal_employees():
    return [
        Employee(
            ID="1",
            DISP_FIRST_NAME="Staci",
            FIRST_NAME="Staci",
            PREF_NAME="Staci",
            MI="J",
            LAST_NAME="Evans",
            SNOW_EMAIL="staci.evans@snow.edu",
        ),
        Employee(
            ID="3",
            DISP_FIRST_NAME="Lillie",
            FIRST_NAME="Mavis",
            PREF_NAME="Lillie",
            MI="L",
            LAST_NAME="Leon",
            SNOW_EMAIL="mavis.leon@snow.edu",
        ),
    ]

@pytest.fixture()
def pending_changes():
    return [
        PendingChange(
            badger_id="1",
            portal_column="LAST_NAME",
            banner_value="Charmaine",
            portal_value="Evans"
        ),
        PendingChange(
            badger_id="1",
            portal_column="SNOW_EMAIL",
            banner_value="staci.charmaine@snow.edu",
            portal_value="staci.evans@snow.edu"
        ),
        PendingChange(
            badger_id="3",
            portal_column="PREF_NAME",
            banner_value="Mavis",
            portal_value="Lillie"
        ),
    ]

@pytest.fixture(autouse=True)
def db_setup(portal_employees, pending_changes):
    run_sql("DELETE FROM employee")
    run_sql("DELETE FROM pending_change")
    run_sql("DELETE FROM historical_change")

    insert_employees(portal_employees)
    insert_pending_changes(pending_changes)
    



### TESTS ###
def test_approving_change_adds_historical_change_to_db(pending_changes):

    # I tried manually inserting pending changes with IDs so that they don't get automatically generated by the sequences for the tables
    # and that I could simply reference changes by ID, but it would have taken too many changes to the code or schema to get working
    # This approach should be good enough
    staci_last_name_change_id: int = run_sql(
        """SELECT id FROM pending_change 
           WHERE portal_column = 'LAST_NAME' AND portal_value = 'Evans'""")[0]  # type: ignore

    commit_change_approval(staci_last_name_change_id)

    test_approval_time = datetime(2000, 1, 1, 1, 1, 1)

    expected_historical_change = HistoricalChange(
        badger_id="1",
        approval_time=test_approval_time,
        portal_column="LAST_NAME",
        banner_value="Charmaine",
        portal_value="Evans"
    )

    actual_historical_change = get_historical_changes_by_badger_id(pending_changes[0].badger_id)[0]

    # ID and approval time are set automatically. They aren't important for this test
    actual_historical_change.id = None
    actual_historical_change.approval_time = test_approval_time

    assert actual_historical_change == expected_historical_change

def test_approving_change_removes_pending_change_from_db(pending_changes: List[PendingChange]):

        staci_last_name_change = run_sql(
        """SELECT * FROM pending_change 
           WHERE portal_column = 'LAST_NAME' AND portal_value = 'Evans'""",
           output_class=PendingChange)[0]

        commit_change_approval(staci_last_name_change.id) # type: ignore

        pending_changes = get_pending_changes()

        assert any([pending_change.id == staci_last_name_change.id for pending_change in pending_changes]) == False           

def test_denying_change_reverts_portal_entry_to_banner_value(pending_changes, portal_employees: List[Employee]):

    staci_email_change: PendingChange = run_sql(
        """SELECT * FROM pending_change 
           WHERE portal_column = 'SNOW_EMAIL' and portal_value = 'staci.evans@snow.edu'""",
           output_class = PendingChange
    )[0]

    commit_change_denial(staci_email_change.id)  # type: ignore

    affected_portal_employee_entry = get_employee_by_id(portal_employees[0].ID)

    assert affected_portal_employee_entry.SNOW_EMAIL == staci_email_change.banner_value

def test_denying_change_removes_pending_change_from_db(pending_changes: List[PendingChange]):

    staci_email_change: PendingChange = run_sql(
        """SELECT * FROM pending_change 
           WHERE portal_column = 'SNOW_EMAIL' and portal_value = 'staci.evans@snow.edu'""",
           output_class = PendingChange
    )[0]
    
    commit_change_denial(staci_email_change.id) # type: ignore

    pending_changes = get_pending_changes()

    assert any([pending_change.id == staci_email_change.id for pending_change in pending_changes]) == False