from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion

router = APIRouter()


class CodegenRequest(BaseModel):
    problem: str
    problem_type: str
    top_model: Optional[str] = ""
    dataset_info: Optional[str] = ""


@router.post("/codegen")
async def generate_code(req: CodegenRequest):
    prompt = f"""You are a senior ML engineer. Generate a complete, production-quality end-to-end Python ML script for:

Problem: {req.problem}
Problem Type: {req.problem_type}
Recommended Model: {req.top_model or "best model for this problem type"}
Dataset Info: {req.dataset_info or "generic dataset"}

Requirements:
- Include imports (scikit-learn, pandas, numpy; or PyTorch/transformers for DL tasks)
- Data loading section (use placeholder CSV path or sample data generation)
- Preprocessing with sklearn Pipeline / ColumnTransformer
- Model training
- Evaluation with appropriate metrics
- Sample prediction
- Add inline comments explaining each section

Return ONLY valid Python code wrapped in ```python ... ```. Do NOT return JSON or any other text."""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=2048
    )

    code = content
    if "```python" in content:
        code = content.split("```python")[1].split("```")[0].strip()
    elif "```" in content:
        code = content.split("```")[1].split("```")[0].strip()

    return {"code": code, "language": "python"}
