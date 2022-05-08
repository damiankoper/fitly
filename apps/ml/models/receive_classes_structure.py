from typing import List

from pydantic import BaseModel

from apps.ml.types.types import ActivityType


class Coordinates(BaseModel):
    x: float
    y: float
    z: float


class Accelerometer(BaseModel):
    timestamp: date
    data: Coordinates


class Gyroscope(BaseModel):
    timestamp: date
    data: Coordinates


class Magnetometer(BaseModel):
    timestamp: date
    data: Coordinates


class ActivityTracking(BaseModel):
    accelerometer: List[Accelerometer]
    gyroscope: List[Gyroscope]
    magnetometer: List[Magnetometer]


class ActivityTrackingMeta(BaseModel):
    type: ActivityType
    interval: str
    repeats: int
