from models.DataModels import DataPoint
from enums.ActivityTypeEnum import ActivityType
from models.DataModels import ActivityTracking, ActivityTrackingMeta
from services.RepetitionCounter import RepetitionCounter
from services.Utilities import utilities
from pydantic import parse_obj_as
from fastapi import FastAPI

app = FastAPI()

repetition_counter = RepetitionCounter()


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

    # Count repeats
    activity.meta.repeats = await repetition_counter.count_repetitions(
        exercise_info, signal_for_counting, activity.meta.uuid
    )

    return activity.meta
