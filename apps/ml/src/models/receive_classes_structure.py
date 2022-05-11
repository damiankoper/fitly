from typing import List
from pydantic import BaseModel
from enums.ActivityType import ActivityType

class Coordinates(BaseModel):
    x: float
    y: float
    z: float

class Accelerometer(BaseModel):
    timestamp: str
    data: Coordinates


class Gyroscope(BaseModel):
    timestamp: str
    data: Coordinates

class Magnetometer(BaseModel):
    timestamp: str
    data: Coordinates


class ActivityTrackingMeta(BaseModel):
    type: ActivityType
    interval: str
    repeats: int

class ActivityTracking(BaseModel):
    meta: ActivityTrackingMeta
    accelerometer: List[Accelerometer]
    gyroscope: List[Gyroscope]
    magnetometer: List[Magnetometer]
