from random import randint
from fastapi import FastAPI
from enums.ActivityType import ActivityType
from models.receive_classes_structure import ActivityTracking, ActivityTrackingMeta

app = FastAPI()

@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):
    activity.meta.repeats = randint(3,10)

    # TODO: if type != UNKNOWN do not overwrite it!!!
    if activity.meta.type == ActivityType.UNKNOWN:
      activity.meta.type = ActivityType.SQUATS

    return activity.meta
