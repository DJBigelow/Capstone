from pydantic import BaseModel

from typing import Optional, Union

from datetime import datetime

class HistoricalChange(BaseModel):
    id: Optional[int]
    badger_id: str
    approval_time: datetime
    portal_column: str
    banner_value: str
    portal_value: str