from pydantic import BaseModel
from enums.ActivityTypeEnum import ActivityType


class SessionState(BaseModel):
    start_state: int
    state: int
    type: ActivityType

    class Config:
        use_enum_values = True
