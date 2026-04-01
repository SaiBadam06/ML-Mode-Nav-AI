from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import analyze, recommend, datasets, preprocessing, metrics, experiments, codegen, execution, chat, debug

app = FastAPI(
    title="ModelNavigator AI",
    description="From Problem to Pipeline — Intelligent ML Guidance",
    version="1.0.0",
)

import os

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api", tags=["Problem Analysis"])
app.include_router(recommend.router, prefix="/api", tags=["Algorithm Recommendations"])
app.include_router(datasets.router, prefix="/api", tags=["Datasets"])
app.include_router(preprocessing.router, prefix="/api", tags=["Preprocessing"])
app.include_router(metrics.router, prefix="/api", tags=["Metrics"])
app.include_router(experiments.router, prefix="/api", tags=["Experiments"])
app.include_router(codegen.router, prefix="/api", tags=["Code Generation"])
app.include_router(execution.router, prefix="/api", tags=["Execution"])
app.include_router(chat.router, prefix="/api", tags=["ML Chat"])
app.include_router(debug.router, prefix="/api", tags=["Code Debugging"])


@app.get("/")
async def root():
    return {"message": "ModelNavigator AI Backend is running 🚀", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
