from typing import Optional
from pydantic import BaseModel

class PendingChange(BaseModel):
    # Set to optional since the table automatically generates a unique id upon insertion
    id: Optional[int]
    badger_id: str
    portal_column: str
    banner_value: str
    portal_value: str
