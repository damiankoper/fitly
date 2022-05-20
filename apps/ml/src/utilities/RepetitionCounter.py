from models.ConfigModels import SignalConfig
from models.DataModels import DataPoint
from config.constants import Constants
from utilities.Utilities import utilities


class RepetitionCounter:
    def count_repetitions(
        self, exercise_info: SignalConfig, source_signal: list[DataPoint]
    ):
        # Resampling
        resampled_signal = utilities.resample(
            source_signal, Constants.SAMPLING_FREQUENCY, Constants.WINDOW_SECONDS
        )

        # Extract only axis used for counting
        signal: list[float] = list(
            map(lambda x: x.dict()[exercise_info.axis], resampled_signal)
        )

        # Normalize signal
        signal = utilities.normalize(utilities.limit_signal(signal, exercise_info))

        return self.__count_repetitions(
            signal,
            exercise_info,
        )

    def __count_repetitions(
        self,
        data: list[float],
        exercise_info: SignalConfig,
    ):
        state = 0
        rep_count = 0
        window_position = exercise_info.window_len
        window_samples = Constants.SAMPLING_FREQUENCY * exercise_info.window_len / 1000

        for x in data:
            if x > exercise_info.upper_bound and window_position > window_samples:
                if state == -1:
                    rep_count += 1
                state = 1
                window_position = 0
            elif x < exercise_info.lower_bound and window_position > window_samples:
                state = -1
                window_position = 0
            window_position += 1

        return rep_count
