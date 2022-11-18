from typing import List
from src.common.services.portal_db_service import run_sql

from src.directory.models.historical_change import HistoricalChange


def get_historical_changes_by_badger_id(badger_id: str) -> List[HistoricalChange]:
    sql = "SELECT * FROM historical_change WHERE badger_id = %s"

    historical_changes = run_sql(sql, [badger_id], output_class=HistoricalChange)

    return historical_changes


def insert_historical_change(historical_change: HistoricalChange):
    sql = """
        INSERT INTO historical_change (
            badger_id, 
            approval_time, 
            portal_column, 
            banner_value,
            portal_value
        ) 
        VALUES (
            %(badger_id)s, 
            %(approval_time)s, 
            %(portal_column)s, 
            %(banner_value)s, 
            %(portal_value)s
        )
    """

    run_sql(sql, historical_change.dict())
