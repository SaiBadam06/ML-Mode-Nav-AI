from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.knowledge_base import METRICS
from services.supabase_service import db

router = APIRouter()


class MetricsRequest(BaseModel):
    problem_type: str
    project_id: Optional[str] = None

@router.post("/metrics")
async def get_metrics(req: MetricsRequest):
    metrics = METRICS.get(req.problem_type, METRICS["Classification"])

    visualizations = {
        "Classification": ["Confusion Matrix", "ROC Curve", "Precision-Recall Curve", "Feature Importance"],
        "Regression": ["Residual Plot", "Actual vs Predicted", "Q-Q Plot", "Feature Importance"],
        "Clustering": ["Elbow Curve", "Silhouette Plot", "Cluster Scatter (PCA 2D)", "Dendrogram"],
        "NLP": ["Confusion Matrix", "Word Cloud", "Attention Heatmap", "Training Loss Curve"],
        "Computer Vision": ["Confusion Matrix", "Sample Predictions Grid", "Training/Validation Curves", "Grad-CAM"],
        "Time Series": ["Forecast vs Actual Plot", "Residual Plot", "ACF/PACF Plot", "Decomposition Plot"],
    }

    result = {
        "metrics": metrics,
        "visualizations": visualizations.get(req.problem_type, []),
    }

    # Persist to Supabase
    if req.project_id:
        db.upsert_project_data("metrics", req.project_id, result)

    return result
