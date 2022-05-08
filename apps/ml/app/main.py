from fastapi import FastAPI, Request

from apps.ml.models.receive_classes_structure import ActivityTrackingMeta, ActivityTracking

app = FastAPI()


@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):
    return activity
