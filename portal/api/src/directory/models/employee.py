from argparse import OPTIONAL
from lib2to3.pgen2.token import OP
from optparse import Option
from pydantic import BaseModel
from typing import Optional

# Some of these properties really should be required, but there are plenty of entries in the banner db with them missing



class Employee(BaseModel):
    ID: str
    DISP_FIRST_NAME: Optional[str] = None
    FIRST_NAME: str
    PREF_NAME: Optional[str] = None
    # A quick note, though I'm not sure it matters: When I made these, I thought MI was
    # for a middle initial, but looking through O_WEBDIR, it looks like it's being used
    # for entire middle names
    MI: Optional[str] = None
    LAST_NAME: str
    SNOW_EMAIL: Optional[str] = None
    POSN: Optional[str] = None
    POSITION: Optional[str] = None
    DEPT_CODE: Optional[str] = None
    DEPT_DESC: Optional[str] = None
    CAMPUS: Optional[str] = None
    OFFICE_BLDG_CODE: Optional[str] = None
    BUILDING_DESC: Optional[str] = None
    OFFICE_ROOM: Optional[str] = None
    OFFICE_AREA: Optional[str] = None
    OFFICE_PHONE: Optional[str] = None