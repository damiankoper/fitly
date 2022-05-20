from pydantic import BaseModel
from enums.ActivityTypeEnum import ActivityType


class Coordinates(BaseModel):
    x: float
    y: float
    z: float

    # def __getitem__(self, item):
    #     return getattr(self, item)


class DataPoint(BaseModel):
    timestamp: str
    data: Coordinates

    # def __getitem__(self, item):
    #     return getattr(self, item)


class ActivityTrackingMeta(BaseModel):
    type: ActivityType
    interval: str
    repeats: int


class ActivityTracking(BaseModel):
    meta: ActivityTrackingMeta
    accelerometer: list[DataPoint]
    gyroscope: list[DataPoint]
    magnetometer: list[DataPoint]
