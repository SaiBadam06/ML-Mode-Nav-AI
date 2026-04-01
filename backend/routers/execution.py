from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion

router = APIRouter()


class ExecutionRequest(BaseModel):
    problem: str
    problem_type: str
    top_model: Optional[str] = ""
    dataset_info: Optional[str] = ""


@router.post("/execution")
async def get_execution_plan(req: ExecutionRequest):
    prompt = f"""You are a senior DevOps and ML Engineer. For the following ML problem, recommend the best execution and deployment environment.

Problem: {req.problem}
Problem Type: {req.problem_type}
Recommended Model: {req.top_model or "Best model"}
Dataset Info: {req.dataset_info or "Generic dataset"}

Given the problem and model size, output ONLY a valid JSON object:
{{
  "hardware": {{
    "tier": "<CPU / Entry GPU (e.g., T4) / High-end GPU (e.g., A100) / TPU>",
    "reasoning": "<Why this hardware is needed>"
  }},
  "platforms": [
    {{
      "name": "Google Colab",
      "suitability": "<Good / Bad>",
      "reasoning": "..."
    }},
    {{
      "name": "Local Machine",
      "suitability": "<Good / Bad>",
      "reasoning": "..."
    }},
    {{
      "name": "Cloud VM (AWS/GCP/Azure)",
      "suitability": "<Good / Bad>",
      "reasoning": "..."
    }}
  ],
  "best_practices": [
    "<Rule 1, e.g. set random seeds>",
    "<Rule 2, e.g. checkpointing>",
    "<Rule 3, e.g. logging metrics>"
  ]
}}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.4,
        max_tokens=1024
    )

    try:
        start = content.find("{")
        end = content.rfind("}") + 1
        result = json.loads(content[start:end])
    except Exception:
        result = _fallback_execution(req.problem_type)

    return result


def _fallback_execution(problem_type: str) -> dict:
    needs_gpu = problem_type in ["Computer Vision", "NLP"]
    return {
        "hardware": {
            "tier": "GPU (e.g., T4 or better)" if needs_gpu else "Standard Multicore CPU",
            "reasoning": "Deep learning models require GPUs for matrix multiplications." if needs_gpu else "Classical ML algorithms run efficiently on CPU."
        },
        "platforms": [
            {
                "name": "Google Colab / Kaggle",
                "suitability": "Good",
                "reasoning": "Free GPU access for prototyping and experimentation."
            },
            {
                "name": "Local Machine",
                "suitability": "Good" if not needs_gpu else "Bad",
                "reasoning": "Great for debugging, but memory might be insufficient for large models."
            },
            {
                "name": "Cloud VM (AWS EC2, GCP Compute)",
                "suitability": "Best for production",
                "reasoning": "Scalable compute, but costs money."
            }
        ],
        "best_practices": [
            "Set random seeds (np.random.seed, torch.manual_seed) for reproducibility.",
            "Use Weights & Biases or MLflow to track your experiment metrics.",
            "Save model checkpoints frequently during long training runs.",
            "Containerize your environment using Docker to avoid dependency conflicts."
        ]
    }
