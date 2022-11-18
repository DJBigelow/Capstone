from pydantic import BaseModel
from typing import List, Any
import cx_Oracle


from src.common.models.entity_type import EntityType, EntityTypeWhereClause
from src.common.models.entity import Entity

import os

oracle_user = os.environ["BANNER_USER"]
oracle_password = os.environ["BANNER_PASSWORD"]
oracle_conn_string = os.environ["BANNER_DBC"]


class SearchOption(BaseModel):
    column_name: str
    value: str


def find_search_option(
    search_options: List[SearchOption], where_clause: EntityTypeWhereClause
):
    options = [x for x in search_options if x.column_name == where_clause.column_name]
    return options[0]


pool = cx_Oracle.SessionPool(
    user=oracle_user,
    password=oracle_password,
    dsn="dbr.snow.edu/DBTSTU",
    min=2,
    max=10,
    increment=1,
    encoding="UTF-8",
)

def __execute_sql__(sql, params):
    with pool.acquire() as connection:
        with connection.cursor() as cursor:
            if params != None:
                cursor.execute(sql, params)
            else:
                cursor.execute(sql)
            
            columns = [col[0] for col in cursor.description]
            cursor.rowfactory = lambda *args: dict(zip(columns, args))
            return cursor.fetchall()

# def search_for_entity(
#     entity_type: EntityType, search_options: List[SearchOption]
# ):
#     where_clause_list = [
#         f"{c.column_name} LIKE UPPER(:{c.column_name})"
#         for c in entity_type.where_clauses
#     ]
#     where_clause = " AND ".join(where_clause_list)
#     sql = f"{entity_type.banner_search_sql} {where_clause}"
#     params = {
#         f"{c.column_name}": f"%{find_search_option(search_options, c).value}%"
#         for c in entity_type.where_clauses
#     }
#     return __execute_sql__(sql, params)

# def get_entity_details(entity: Entity, entity_type: EntityType) -> Any:
#     if not entity_type.is_banner_entity:
#         return
#     sql = entity_type.banner_select_sql
#     params = {"id": entity.external_id}
#     return __execute_sql__(sql, params)[0]