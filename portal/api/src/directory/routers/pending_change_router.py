from fastapi import (
    APIRouter
)
from src.directory.repositories.pending_change_repository import get_pending_changes, get_pending_changes_with_employee_names

from src.directory.services.change_comission_service import (
    commit_change_approval,
    commit_change_denial
)

from pydantic import BaseModel



class ChangeCommissionInformation(BaseModel):
    pendingChangeId: int
    approved: bool

router = APIRouter(
    prefix='/pending-changes',
    responses={404: {"description": "Not found"}}
)

@router.get("/get-all")
def get_unapproved_changes():
    pending_changes = get_pending_changes_with_employee_names()
    return {"success": True, "changes": pending_changes}

@router.post("/process-change")
def approve_change(commission_info: ChangeCommissionInformation):
    if commission_info.approved:
        commit_change_approval(commission_info.pendingChangeId)
    else:
        commit_change_denial(commission_info.pendingChangeId)

    return { "success": True }
