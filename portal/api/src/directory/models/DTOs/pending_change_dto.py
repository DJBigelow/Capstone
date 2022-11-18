from typing import Optional
from pydantic import BaseModel

class PendingChangeDTO(BaseModel):
    id: str
    badger_id: str
    portal_column: str
    banner_value: str
    portal_value: str
    FIRST_NAME: str
    PREF_NAME: Optional[str]
    MI: Optional[str]
    LAST_NAME: Optional[str]

    
