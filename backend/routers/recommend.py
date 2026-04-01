from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion
from services.knowledge_base import ALGORITHMS
from services.supabase_service import db

router = APIRouter()


class RecommendRequest(BaseModel):
    problem: str
    problem_type: str
    domain: Optional[str] = ""
    project_id: Optional[str] = None


@router.post("/recommend")
async def recommend_algorithms(req: RecommendRequest):
    base_algos = ALGORITHMS.get(req.problem_type, ALGORITHMS["Classification"])

    prompt = f"""You are an expert ML engineer. For the following problem, enrich the algorithm recommendations.

Problem: {req.problem}
Problem Type: {req.problem_type}
Domain: {req.domain}

For each algorithm, provide a "why_this_model" explanation specific to this problem (1-2 sentences).
Return ONLY valid JSON in this format:
{{
  "why_recommendations": {{
    "<algorithm_name>": "<specific reason for this problem>"
  }},
  "top_pick": "<name of the single best algorithm for this problem>",
  "top_pick_reason": "<why it's the best choice>"
}}

Algorithm names to explain: {[a['name'] for cat in base_algos.values() for a in cat]}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.4,
        max_tokens=1024
    )

    try:
        start = content.find("{")
        end = content.rfind("}") + 1
        enrichment = json.loads(content[start:end])
    except Exception:
        enrichment = {"why_recommendations": {}, "top_pick": "", "top_pick_reason": ""}

    why_map = enrichment.get("why_recommendations", {})

    def enrich(algo_list):
        result = []
        for a in algo_list:
            result.append({
                **a,
                "why_this_model": why_map.get(a["name"], f"Effective choice for {req.problem_type} problems.")
            })
        return result

    result = {
        "beginner": enrich(base_algos.get("beginner", [])),
        "advanced": enrich(base_algos.get("advanced", [])),
        "top_pick": enrichment.get("top_pick", ""),
        "top_pick_reason": enrichment.get("top_pick_reason", ""),
    }

    # Persist to Supabase
    if req.project_id:
        db.upsert_project_data("recommendations", req.project_id, result)

    return result
