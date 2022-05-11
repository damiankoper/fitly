from fastapi import FastAPI
from models.receive_classes_structure import ActivityTracking, ActivityTrackingMeta

app = FastAPI()

@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):
    return activity.meta
