from models.DataModels import DataPoint
from enums.ActivityTypeEnum import ActivityType
from models.DataModels import ActivityTracking, ActivityTrackingMeta
from services.RepetitionCounter import RepetitionCounter
from services.Utilities import utilities
from pydantic import parse_obj_as
from fastapi import FastAPI
from dateutil import parser
from datetime import datetime

app = FastAPI()

repetition_counter = RepetitionCounter()

def fitly_resample(signal_data, target_freq, target_len):
    target_ms = target_len * 1000
    step_ms = 1000 / target_freq
    resampled = []
    current_time_ms = 0
    current_src_sample = 0
    timestamps_ms = []

    first_value = datetime.timestamp(parser.parse(signal_data.accelerometer[0].timestamp))


    for sample in signal_data.accelerometer:
        timestamps_ms.append((datetime.timestamp(parser.parse(sample.timestamp)) - first_value) * 1000)

    while current_time_ms <= target_ms:
        while current_src_sample < len(timestamps_ms) - 1 and current_time_ms >= timestamps_ms[current_src_sample + 1]:
            current_src_sample += 1
        resampled.append(signal_data.accelerometer[current_src_sample].data)
        current_time_ms += step_ms
    return resampled


def load_single_json(activity_data):
    signals = []
    for device in ["accelerometer", "gyroscope", "magnetometer"]:
        # empty points
        # if not activity_data[device]:
        #     return None
        # points which don't have samples array
        # if not isinstance(activity_data[device], list):
        #     return None


        resampled = fitly_resample(activity_data, 25, 10)

        for axis in ["x", "y", "z"]:
            converted = {}
            # metadata
            # converted["file_name"] = path
            converted["type"] = activity_data.meta.type
            converted["repeats"] = activity_data.meta.repeats
            converted["interval"] = activity_data.meta.interval
            # signal
            converted["device"] = device
            converted["axis"] = axis


            for i in range(len(resampled)):
                converted[i] = getattr(resampled[i], axis)

            signals.append(converted)
    return signals


@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):
    # Classification
    # TODO: if type != UNKNOWN do not overwrite it!!!
    if activity.meta.type == ActivityType.UNKNOWN:
        activity.meta.type = ActivityType.SQUATS

    # Counting repetitions

    # Extract signal & config data
    exercise_info = utilities.get_signal_config(activity.meta.type)
    signal_for_counting: list[DataPoint] = parse_obj_as(
        list[DataPoint], activity.dict()[exercise_info.device.value]
    )

    loaded_data = load_single_json(activity)
    print('API loaded data', loaded_data)

    # Count repeats
    activity.meta.repeats = await repetition_counter.count_repetitions(
        exercise_info, signal_for_counting, activity.meta.uuid
    )

    return activity.meta
