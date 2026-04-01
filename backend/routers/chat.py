from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from services.groq_client import chat_completion
from services.supabase_service import db

router = APIRouter()


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    context: Optional[str] = ""
    project_id: Optional[str] = None

SYSTEM_PROMPT = """You are ModelNavigator AI's expert ML Assistant. Your role is to:
1. Answer questions about machine learning algorithms, concepts, and best practices
2. Explain recommendations from the ModelNavigator analysis
3. Help users understand preprocessing steps, evaluation metrics, and model architecture
4. Provide practical coding advice for ML workflows
5. Suggest improvements to ML pipelines

Be concise, clear, and practical. Use examples when helpful. 
If asked about something outside ML/AI, gently redirect to ML topics.
Format your responses with clear headings and bullet points where appropriate."""


@router.post("/chat")
async def chat(req: ChatRequest):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    if req.context:
        messages.append({
            "role": "system",
            "content": f"Current analysis context: {req.context}"
        })

    for msg in req.messages:
        messages.append({"role": msg.role, "content": msg.content})

    response = chat_completion(messages, temperature=0.7, max_tokens=1024)

    # Persist to Supabase
    if req.project_id:
        # Save user's last message
        user_msg = req.messages[-1].content if req.messages else ""
        db.save_chat_message(req.project_id, "user", user_msg, req.context)
        # Save assistant's response
        db.save_chat_message(req.project_id, "assistant", response, req.context)

    return {"response": response}
