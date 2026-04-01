from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion
from services.knowledge_base import PROBLEM_TYPES

router = APIRouter()


class AnalyzeRequest(BaseModel):
    problem: str
    dataset_info: Optional[str] = ""


@router.post("/analyze")
async def analyze_problem(req: AnalyzeRequest):
    prompt = f"""You are an expert ML engineer. Analyze the following problem description and classify it.

Problem: {req.problem}
Dataset Info: {req.dataset_info or "Not provided"}

Respond ONLY with a valid JSON object in this exact format:
{{
  "problem_type": "<one of: Classification, Regression, Clustering, NLP, Computer Vision, Time Series>",
  "confidence": <0.0 to 1.0>,
  "domain": "<brief domain, e.g. Healthcare, Finance, E-commerce>",
  "summary": "<1-2 sentence explanation of why this problem type was chosen>",
  "key_challenges": ["<challenge 1>", "<challenge 2>", "<challenge 3>"],
  "suggested_approach": "<brief high-level approach>"
}}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=512
    )

    try:
        # Extract JSON from response
        start = content.find("{")
        end = content.rfind("}") + 1
        result = json.loads(content[start:end])
    except Exception:
        result = {
            "problem_type": "Classification",
            "confidence": 0.7,
            "domain": "General",
            "summary": "Could not precisely classify. Defaulting to Classification.",
            "key_challenges": ["Data quality", "Feature engineering", "Model selection"],
            "suggested_approach": "Start with a baseline classifier and iterate."
        }

    return result
