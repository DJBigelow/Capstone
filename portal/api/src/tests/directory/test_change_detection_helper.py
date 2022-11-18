from typing import List
import pytest
from datetime import datetime

from src.directory.helpers.change_detection_helper import (
    group_banner_and_portal_employee_entries,
    get_changes_between_banner_and_portal_employee,
    historical_change_exists_for_pending_change,
    historical_change_covers_pending_change,
)

from src.directory.models.employee import Employee
from src.directory.models.pending_change import PendingChange
from src.directory.models.historical_change import HistoricalChange

############ FIXTURES ############


@pytest.fixture
def banner_employees_list() -> List[Employee]:
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
def portal_employees_list() -> List[Employee]:
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


############ TESTS ############


def test_can_get_differences_between_differing_employee_entries(
    banner_employees_list, portal_employees_list
):

    # Compare the banner and portal entries for Mavis Leon, whose DISP_FIRST_NAME and PREFERRED_NAME attributes have been changed to "Lillie" in the portal
    banner_emp = banner_employees_list[2]
    portal_emp = portal_employees_list[2]

    actual_changes: List[
        PendingChange
    ] = get_changes_between_banner_and_portal_employee(banner_emp, portal_emp)
    expected_changes: List[PendingChange] = [
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

    assert actual_changes == expected_changes


def test_no_differences_found_on_identical_employee_entries(
    banner_employees_list: List[Employee], portal_employees_list: List[Employee]
):

    banner_emp = banner_employees_list[3]
    portal_emp = portal_employees_list[3]

    actual_changes = get_changes_between_banner_and_portal_employee(
        banner_emp, portal_emp
    )

    assert actual_changes == []


def test_historical_change_exists_for_pending_change(
    historical_changes: List[HistoricalChange],
):

    pending_change = PendingChange(
        badger_id="1",
        portal_column="LAST_NAME",
        banner_value="Charmaine",
        portal_value="Evans",
    )

    # The SQL query for historical changes should just select historical changes for a given employee, hence why we're only
    # passing the historical change that applies to Staci as a list
    assert historical_change_exists_for_pending_change(
        pending_change, historical_changes[0:1]
    )


def test_historical_change_does_not_exist_for_pending_change(
    historical_changes: List[HistoricalChange],
):

    pending_change = PendingChange(
        badger_id="3",
        portal_column="DISP_FIRST_NAME",
        banner_value="Mavis",
        portal_value="Lillie",
    )

    assert (
        historical_change_exists_for_pending_change(pending_change, historical_changes)
        == False
    )


def test_historical_change_covers_pending_change():

    pending_change = PendingChange(
        badger_id="1", portal_column="PREF_NAME", banner_value="A", portal_value="B"
    )

    historical_change = HistoricalChange(
        badger_id="1",
        approval_time=datetime(2001, 1, 1),
        portal_column="PREF_NAME",
        banner_value="A",
        portal_value="B",
    )

    assert (
        historical_change_covers_pending_change(pending_change, historical_change)
        == True
    )


def test_historical_change_does_not_cover_pending_change():
    pending_change = PendingChange(
        badger_id="1", portal_column="PREF_NAME", banner_value="A", portal_value="B"
    )

    historical_change = HistoricalChange(
        badger_id="1",
        approval_time=datetime(2001, 1, 1),
        portal_column="PREF_NAME",
        banner_value="B",
        portal_value="D",
    )

    assert (
        historical_change_covers_pending_change(pending_change, historical_change)
        == False
    )


def test_can_group_employee_entries(banner_employees_list, portal_employees_list):
    # Todo: Scramble lists (not randomly) to make sure things aren't just being zipped up in order
    actual_grouped_employees = group_banner_and_portal_employee_entries(
        banner_employees_list, portal_employees_list
    )
    expected_grouped_employees = [
        (banner_employees_list[0], portal_employees_list[0]),
        (banner_employees_list[1], portal_employees_list[1]),
        (banner_employees_list[2], portal_employees_list[2]),
        (banner_employees_list[3], portal_employees_list[3]),
    ]

    for index, _ in enumerate(actual_grouped_employees):
        assert actual_grouped_employees[index] == expected_grouped_employees[index]


# How do we handle new entries in banner? When we find an employee in the Banner db with no matching employee in the Portal db,
# does that need to be approved? If so, should we have a special type of PendingChange for entire entries instead of column differences?
# Also, come up with a better name for this test
def test_group_employees_when_banner_employee_isnt_in_portal_db():
    pass
