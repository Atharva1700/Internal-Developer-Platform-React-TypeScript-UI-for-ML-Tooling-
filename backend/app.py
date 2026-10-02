from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EvalRequest(BaseModel):
    model_version: str

class EvalResult(BaseModel):
    run_id: str
    status: str
    accuracy: float
    f1_score: float

@app.post("/api/eval")
async def trigger_evaluation(req: EvalRequest) -> EvalResult:
    run_id = str(uuid.uuid4())[:8]
    accuracy = random.uniform(0.8, 0.95)
    f1_score = random.uniform(0.78, 0.94)
    return EvalResult(
        run_id=run_id,
        status="completed",
        accuracy=accuracy,
        f1_score=f1_score,
    )

@app.get("/health")
async def health():
    return {"status": "ok"}
