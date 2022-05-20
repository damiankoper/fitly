from pydantic import BaseModel
from enums.DeviceEnum import Device
from enums.ActivityTypeEnum import ActivityType


class SignalConfig(BaseModel):
    device: Device
    axis: str
    upper_bound: float
    lower_bound: float
    window_len: int
    type: ActivityType


class SignalsConfigs(BaseModel):
    squats: SignalConfig
    pushups: SignalConfig
    star_jumps: SignalConfig
    situps: SignalConfig
