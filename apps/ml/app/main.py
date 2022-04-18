from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()


class ActivityTrackingMeta(BaseModel):
    type: str
    interval: str
    repeats: int

@app.post("/api/v1/load_data")
async def classify_data(info : Request):
    req_info = await info.json()

# TODO pass req_info to clasificator and return content for response
    json_response = {
      "ActivityTrackingMeta": ActivityTrackingMeta
    }

    return JSONResponse(content=json_response)
