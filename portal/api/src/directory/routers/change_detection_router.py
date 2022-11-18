from fastapi import (
    APIRouter,
    Request, 
    Depends
)

from pydantic import BaseModel

from src.directory.services.migration_service import migrate_employees
from src.directory.services.change_detection_service import detect_and_commit_changes
from src.directory.repositories.pending_change_repository import get_pending_changes

router = APIRouter(
    prefix="/dir-change-detection",
    responses={404: {"description": "Not found"}}
)

@router.post("/migrate")
def start_migration():
    migrate_employees()
    return {"success": True}

@router.post("/start")
def start_change_detection():
    detect_and_commit_changes()
    return {"success": True}

