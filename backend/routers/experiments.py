from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion
from services.supabase_service import db

router = APIRouter()


class ExperimentsRequest(BaseModel):
    problem: str
    problem_type: str
    top_model: Optional[str] = ""
    project_id: Optional[str] = None


@router.post("/experiments")
async def get_experiments(req: ExperimentsRequest):
    prompt = f"""You are a senior ML researcher. Design an experiment strategy for:

Problem: {req.problem}
Problem Type: {req.problem_type}
Primary Model: {req.top_model or "not specified"}

Return ONLY valid JSON:
{{
  "strategies": [
    {{
      "title": "Baseline Experiment",
      "description": "...",
      "steps": ["step1", "step2", "step3"],
      "priority": "High"
    }},
    {{
      "title": "Hyperparameter Tuning",
      "description": "...",
      "steps": ["step1", "step2", "step3"],
      "priority": "High"
    }},
    {{
      "title": "Cross-Validation Strategy",
      "description": "...",
      "steps": ["step1", "step2"],
      "priority": "Medium"
    }},
    {{
      "title": "Feature Selection",
      "description": "...",
      "steps": ["step1", "step2"],
      "priority": "Medium"
    }},
    {{
      "title": "Model Comparison",
      "description": "...",
      "steps": ["step1", "step2", "step3"],
      "priority": "Low"
    }}
  ]
}}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=1024
    )

    try:
        start = content.find("{")
        end = content.rfind("}") + 1
        result = json.loads(content[start:end])
    except Exception:
        result = {
            "strategies": [
                {
                    "title": "Baseline Experiment",
                    "description": "Establish a simple baseline to measure improvement against.",
                    "steps": ["Train a simple model", "Record baseline metrics", "Set as benchmark"],
                    "priority": "High"
                },
                {
                    "title": "Hyperparameter Tuning",
                    "description": "Use GridSearchCV or Optuna to find optimal hyperparameters.",
                    "steps": ["Define parameter grid", "Run cross-validated search", "Select best params"],
                    "priority": "High"
                },
                {
                    "title": "Cross-Validation",
                    "description": "Use k-fold CV to get reliable performance estimates.",
                    "steps": ["Use StratifiedKFold for classification", "Average metrics across folds"],
                    "priority": "Medium"
                }
            ]
        }

    # Persist to Supabase
    if req.project_id:
        db.upsert_project_data("experiments", req.project_id, result)

    return result
