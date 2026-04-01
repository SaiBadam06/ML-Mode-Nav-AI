from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion
from services.knowledge_base import DATASETS

router = APIRouter()


class DatasetsRequest(BaseModel):
    problem: str
    problem_type: str
    domain: Optional[str] = ""


@router.post("/datasets")
async def get_datasets(req: DatasetsRequest):
    base_datasets = DATASETS.get(req.problem_type, DATASETS["Classification"])

    prompt = f"""You are an expert ML engineer. Given this problem:
Problem: {req.problem}
Domain: {req.domain}

Suggest 2 additional specific dataset recommendations (from Kaggle or UCI) that would be particularly relevant to this exact problem.
Return ONLY valid JSON:
{{
  "additional": [
    {{"name": "...", "description": "...", "size": "...", "link": "...", "relevance": "why this dataset fits the problem"}},
    {{"name": "...", "description": "...", "size": "...", "link": "...", "relevance": "why this dataset fits the problem"}}
  ]
}}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=512
    )

    try:
        start = content.find("{")
        end = content.rfind("}") + 1
        extra = json.loads(content[start:end])
        additional = extra.get("additional", [])
    except Exception:
        additional = []

    all_datasets = [
        {**d, "relevance": f"Standard benchmark for {req.problem_type} problems."} for d in base_datasets
    ] + additional

    return {"datasets": all_datasets}
