from models.SessionState import SessionState
from models.ConfigModels import SignalConfig
from models.DataModels import DataPoint
from config.Config import Config
from services.Utilities import utilities
from services.Redis import redis_client
import os


class RepetitionCounter:
    async def count_repetitions(
        self,
        exercise_info: SignalConfig,
        source_signal: list[DataPoint],
        session_uuid: str,
    ):
        # Resampling
        resampled_signal = utilities.resample(
            source_signal,
            int(os.getenv("SAMPLING_FREQUENCY", 25)),
            int(os.getenv("WINDOW_SECONDS", 10)),
        )

        # Extract only axis used for counting
        signal: list[float] = list(
            map(lambda x: x.dict()[exercise_info.axis], resampled_signal)
        )

        # Normalize signal
        signal = utilities.normalize(utilities.limit_signal(signal, exercise_info))

        # Check if there is a previous state for received uuid and the exercise did not change
        prev_state = await redis_client.get_session_state(session_uuid)

        if prev_state and prev_state.type == exercise_info.type:
            state = prev_state.state
            start_state = prev_state.start_state
        else:
            state = 0
            start_state = 0

        # Caluculate rep count taking into account the previous step
        new_start_state, new_state, rep_count = self.__count_repetitions(
            signal, exercise_info, state, start_state
        )

        # update session state with values from current signal
        new_session_state = SessionState(
            start_state=new_start_state, state=new_state, type=exercise_info.type
        )
        await redis_client.set_session_state(session_uuid, new_session_state)

        return rep_count

    def __count_repetitions(
        self,
        data: list[float],
        exercise_info: SignalConfig,
        state,
        start_state,
    ):
        rep_count = 0
        window_position = exercise_info.window_len
        window_samples = Config.SAMPLING_FREQUENCY * exercise_info.window_len / 1000

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

        return start_state, state, rep_count
