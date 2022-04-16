import shutil
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/api/v1")
async def root():
    return {"message": "Hello fitly"}


@app.post("/api/v1/load_data")
async def getData(info : Request):
    req_info = await info.json()

# TODO pass req_info to clasificator and return content for response
    json_response = {
      "ActivityTrackingMeta": {
        "type": "squats",
        "interval": {},
        "repeats": 0
      }
    }

    return JSONResponse(content=json_response)
