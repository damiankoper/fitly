import shutil
from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/api/v1")
async def root():
    return {"message": "Hello fitly"}


@app.post("/api/v1/load_data")
async def getData(info : Request):
    req_info = await info.json()
    return {
      "status": "SUCCESS",
      "data": req_info
    }
