from typing import List
import pytest
from datetime import datetime


from src.directory.models.employee import Employee
from src.directory.models.pending_change import PendingChange
from src.directory.models.historical_change import HistoricalChange

import src.directory.services.change_detection_service as change_detection_service

import src.directory.repositories.pending_change_repository as pending_change_repository


#### TEST DATA ####

@pytest.fixture
def banner_employees():
    return [
        Employee(
            ID="1",
            DISP_FIRST_NAME="Staci",
            FIRST_NAME="Staci",
            PREF_NAME="Staci",
            MI="J",
            LAST_NAME="Charmaine",
            SNOW_EMAIL="staci.charmaine@snow.edu",
        ),
        Employee(
            ID="2",
            DISP_FIRST_NAME="Abbie",
            FIRST_NAME="Abbie",
            PREF_NAME="Abbie",
            MI="B",
            LAST_NAME="Robby",
            SNOW_EMAIL="abbie.robby@snow.edu",
        ),
        Employee(
            ID="3",
            DISP_FIRST_NAME="Mavis",
            FIRST_NAME="Mavis",
            PREF_NAME="Mavis",
            MI="L",
            LAST_NAME="Leon",
            SNOW_EMAIL="mavis.leon@snow.edu",
        ),
        Employee(
            ID="4",
            DISP_FIRST_NAME="Inez",
            FIRST_NAME="Buster",
            PREF_NAME="Inez",
            MI="I",
            LAST_NAME="MacNiven",
            SNOW_EMAIL="buster.macniven@snow.edu",
        ),
    ]


@pytest.fixture
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
            ID="2",
            DISP_FIRST_NAME="Abbie",
            FIRST_NAME="Abbie",
            PREF_NAME="Abbie",
            MI="B",
            LAST_NAME="Robby",
            SNOW_EMAIL="abbie.robby@snow.edu",
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
        Employee(
            ID="4",
            DISP_FIRST_NAME="Inez",
            FIRST_NAME="Buster",
            PREF_NAME="Inez",
            MI="I",
            LAST_NAME="MacNiven",
            SNOW_EMAIL="buster.macniven@snow.edu",
        ),
    ]


@pytest.fixture
def historical_changes() -> List[HistoricalChange]:
    return [
        HistoricalChange(
            badger_id="1",
            approval_time=datetime(2001, 1, 1),
            portal_column="LAST_NAME",
            banner_value="Charmaine",
            portal_value="Evans",
        ),
        HistoricalChange(
            badger_id="4",
            approval_time=datetime(1998, 2, 2),
            portal_column="LAST_NAME",
            banner_value="Salez",
            portal_value="MacNiven",
        ),
    ]


#### MOCKS ####


@pytest.fixture(autouse=True)
def mock_get_historical_changes(monkeypatch, historical_changes):
    monkeypatch.setattr(
        change_detection_service.historical_change_repository,
        "get_historical_changes_by_badger_id",
        lambda badger_id: (
            hist_change
            for hist_change in historical_changes
            if hist_change.badger_id == badger_id
        ),
    )


@pytest.fixture(autouse=True)
def mock_get_banner_employees(monkeypatch, banner_employees):
    monkeypatch.setattr(
        change_detection_service.banner_employee_repository,
        "get_banner_employees",
        lambda: banner_employees,
    )


@pytest.fixture(autouse=True)
def setup_portal_employees(portal_employees):
    from src.directory.repositories.portal_employee_repository import insert_employees
    from src.common.services.portal_db_service import run_sql

    # run_sql("DELETE FROM employee")
    insert_employees(portal_employees)
    yield
    run_sql("DELETE FROM employee")


# @pytest.fixture(scope='module', autouse=True)
# def teardown_portal_employees():
#     from src.common.services.portal_db_service import run_sql
#     run_sql("DELETE FROM employee")


@pytest.fixture(autouse=True)
def reset_pending_changes():
    from src.common.services.portal_db_service import run_sql
    yield
    run_sql("DELETE FROM pending_change")


#### TESTS ####


def test_change_detection_commits_pending_changes():

    change_detection_service.detect_and_commit_changes()

    pending_changes = pending_change_repository.get_pending_changes()

    expected_pending_changes = [
        PendingChange(
            badger_id="1",
            portal_column="SNOW_EMAIL",
            banner_value="staci.charmaine@snow.edu",
            portal_value="staci.evans@snow.edu",
        ),
        PendingChange(
            badger_id="3",
            portal_column="DISP_FIRST_NAME",
            banner_value="Mavis",
            portal_value="Lillie",
        ),
        PendingChange(
            badger_id="3",
            portal_column="PREF_NAME",
            banner_value="Mavis",
            portal_value="Lillie",
        ),
    ]

    for index, actual_change in enumerate(pending_changes):
        expected_change = expected_pending_changes[index]
        # Don't compare change ids since they default to values in a sequence when they're inserted into the database
        actual_change.id = None
        assert expected_change == actual_change
