from dateutil import parser
from datetime import datetime
import json
import os

from models.DataModels import DataPoint
from models.DataModels import ActivityTracking
from models.ConfigModels import SignalConfig, SignalsConfigs
from enums.ActivityTypeEnum import ActivityType
from config.Config import Config


class Utilities:
    def __init__(self) -> None:
        with open(f"{Config.CONFIG_BASE_PATH}/signals_limits.json") as signals_limits_f:
            self.signals_limits: dict = json.load(signals_limits_f)
            self.signals_configs: SignalsConfigs = SignalsConfigs.parse_file(
                f"{Config.CONFIG_BASE_PATH}/signals_configs.json"
            )

    def get_signal_config(self, activity_type: ActivityType) -> SignalConfig:
        return SignalConfig.parse_obj(self.signals_configs.dict()[activity_type.value])

    def normalize(self, samples: list[float]):
        min_val = min(samples)
        max_val = max(samples)
        shift = -min_val

        if max_val + shift == 0:
            factor = float(0)
        else:
            factor = 1 / (max_val + shift)

        normalized = list(map(lambda x: (x + shift) * factor * 2 - 1, samples))
        return normalized

    def _resample_signal(
        self, signal_data: list[DataPoint], target_freq: int, target_len: int
    ) -> list[DataPoint]:
        target_ms = target_len * 1000
        step_ms = 1000 // target_freq
        resampled = []
        current_time_ms = 0
        current_src_sample = 0
        timestamps_ms = []

        first_value = datetime.timestamp(parser.parse(signal_data[0].timestamp))

        for sample in signal_data:
            timestamps_ms.append(
                (datetime.timestamp(parser.parse(sample.timestamp)) - first_value)
                * 1000
            )

        while current_time_ms <= target_ms:
            while (
                current_src_sample < len(timestamps_ms) - 1
                and current_time_ms >= timestamps_ms[current_src_sample + 1]
            ):
                current_src_sample += 1
            resampled.append(signal_data[current_src_sample])
            current_time_ms += step_ms
        return resampled

    def resample_all_signals(self, activity: ActivityTracking):

        activity.accelerometer = self._resample_signal(
            activity.accelerometer,
            int(os.getenv("SAMPLING_FREQUENCY", 25)),
            int(os.getenv("WINDOW_SECONDS", 10)),
        )

        activity.gyroscope = self._resample_signal(
            activity.gyroscope,
            int(os.getenv("SAMPLING_FREQUENCY", 25)),
            int(os.getenv("WINDOW_SECONDS", 10)),
        )

        activity.magnetometer = self._resample_signal(
            activity.magnetometer,
            int(os.getenv("SAMPLING_FREQUENCY", 25)),
            int(os.getenv("WINDOW_SECONDS", 10)),
        )
        return activity

    def limit_signal(self, samples: list[float], exercise_info: SignalConfig):
        bounds = self.signals_limits[exercise_info.type.value][
            exercise_info.device.value
        ][exercise_info.axis]
        min, max = bounds["min"], bounds["max"]

        limited = list(
            map(lambda x: max if x > max else (min if x < min else x), samples)
        )
        return limited


utilities = Utilities()
