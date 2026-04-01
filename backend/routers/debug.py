from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.groq_client import chat_completion

router = APIRouter()

class DebugRequest(BaseModel):
    context: dict
    history: list = []

@router.post("/debug")
async def analyze_and_debug_code(req: DebugRequest):
    context = req.context
    system_prompt = f"""You are a STRICT AI Code Debugger specifically designed for the ML pipeline generated for the user's problem.
You MUST ONLY answer questions related to debugging, explaining, or solving errors in the Machine Learning code provided below.
If the user asks you to write emails, tell jokes, solve general problems, or do ANYTHING outside the scope of fixing/explaining the generated code or the machine learning problem described below, you MUST politely refuse.

**Full Project Context:**
- Problem: {context.get('problem')}
- Domain: {context.get('analyze', {}).get('domain')}
- Problem Type: {context.get('analyze', {}).get('problem_type')}
- Recommended Algorithm: {context.get('recommend', {}).get('top_pick')}
- Preprocessing Used: {context.get('preprocessing', {}).get('summary', 'Standard preprocessing')}

**Generated Python Code to Debug:**
```python
{context.get('codegen', {}).get('code', 'No code generated')}
```

Be concise, helpful, and provide code snippets if necessary to fix the user's errors."""

    messages = [{"role": "system", "content": system_prompt}]
    
    for msg in req.history:
        messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})

    content = chat_completion(
        messages,
        temperature=0.3,
        max_tokens=2048
    )

    return {"analysis": content}
