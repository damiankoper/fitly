from pydantic import BaseModel
from enums.ActivityTypeEnum import ActivityType


class Coordinates(BaseModel):
    x: float
    y: float
    z: float


class DataPoint(BaseModel):
    timestamp: str
    data: Coordinates


class ActivityTrackingMeta(BaseModel):
    type: ActivityType
    interval: str
    repeats: int


class ActivityTracking(BaseModel):
    meta: ActivityTrackingMeta
    accelerometer: list[DataPoint]
    gyroscope: list[DataPoint]
    magnetometer: list[DataPoint]
