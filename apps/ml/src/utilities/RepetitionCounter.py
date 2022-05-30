from models.ConfigModels import SignalConfig
from models.DataModels import DataPoint
from config.constants import Constants
from utilities.Utilities import utilities


class RepetitionCounter:
    sessions = {}

    def count_repetitions(
        self,
        exercise_info: SignalConfig,
        source_signal: list[DataPoint],
        session_uuid: str,
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
        signal = utilities.normalize(
            utilities.limit_signal(signal, exercise_info))

        return self.__count_repetitions(
            signal,
            exercise_info,
            session_uuid,
        )

    def __count_repetitions(
        self,
        data: list[float],
        exercise_info: SignalConfig,
        session_uuid: str,
    ):
        state = 0
        start_state = 0
        rep_count = 0
        window_position = exercise_info.window_len
        window_samples = Constants.SAMPLING_FREQUENCY * exercise_info.window_len / 1000

        if session_uuid in self.sessions and self.sessions[session_uuid]["type"] == exercise_info.type:
            state = self.sessions[session_uuid]["state"]
            start_state = self.sessions[session_uuid]["start_state"]

        for x in data:
            if window_position > window_samples:
                if x > exercise_info.upper_bound:
                    if start_state == 0:
                        start_state = 1
                    if start_state == -1 and state == -1:
                        rep_count += 1
                    state = 1
                    window_position = 0
                elif x < exercise_info.lower_bound:
                    if start_state == 0:
                        start_state = -1
                    if start_state == 1 and state == 1:
                        rep_count += 1
                    state = -1
                    window_position = 0

            window_position += 1

        self.sessions[session_uuid] = {
            "start_state": start_state,
            "state": state,
            "type": exercise_info.type
        }

        return rep_count
