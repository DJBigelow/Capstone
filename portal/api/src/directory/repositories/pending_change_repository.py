from src.common.services.portal_db_service import (
    run_sql,
)
from src.directory.models.DTOs.pending_change_dto import PendingChangeDTO
from src.directory.models.pending_change import PendingChange

from typing import List

def get_pending_changes_with_employee_names():
    sql = """
        SELECT pc.id,
               pc.badger_id,
               pc.portal_column,
               pc.banner_value,
               pc.portal_value,
               e."FIRST_NAME",
               e."PREF_NAME",
               e."MI",
               e."LAST_NAME"
        FROM pending_change pc
        INNER JOIN employee e
            ON e."ID" = pc.badger_id
    """
    return run_sql(sql, output_class=PendingChangeDTO)

def get_pending_changes():
    sql = """
        SELECT * FROM pending_change
    """
    return run_sql(sql, output_class=PendingChange)

def get_pending_change_by_id(pendingChangeId: int) -> PendingChange:
    sql = """
        SELECT * FROM pending_change
        WHERE id = %(id)s

    """

    change = run_sql(sql, {"id": pendingChangeId}, PendingChange)[0]
    return change


def remove_pending_change(change: PendingChange):
    sql = "DELETE FROM pending_change WHERE id = %s"
    run_sql(sql, [change.id])


def insert_pending_changes(pending_changes: List[PendingChange]):

    sql = """
        INSERT INTO pending_change (
            badger_id,
            portal_column,
            banner_value,
            portal_value
        )
        VALUES (
            %(badger_id)s,
            %(portal_column)s,
            %(banner_value)s,
            %(portal_value)s
        );
    """

    for pending_change in pending_changes:
        run_sql(sql, pending_change.dict())
    