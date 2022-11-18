from fastapi import (
    APIRouter
)

from src.directory.repositories.banner_building_repository import (
    get_buildings
)

router = APIRouter(
    prefix="/buildings",
)

@router.get("/get-all")
def get_all_buildings():
    buildings = get_buildings()
    formatted_buildings = format_buildings(buildings)
    return {"success": True, "buildings": formatted_buildings}

def format_buildings(buildings):
    formatted_buildings = [
        building["BLDG_DESC"]
        for building in buildings
    ]

    return formatted_buildings 