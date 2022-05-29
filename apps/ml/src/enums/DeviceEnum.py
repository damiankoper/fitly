from enum import Enum


class Device(Enum):
    accelerometer = "accelerometer"
    gyroscope = "gyroscope"
    magnetometer = "magnetometer"

    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))
