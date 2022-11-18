from src.common.services.banner_db_service import __execute_sql__

def get_buildings():

    sql = """
        SELECT BLDG_CODE, BLDG_DESC
        FROM BUILDING
    """

    buildings = __execute_sql__(sql, None)

    return buildings