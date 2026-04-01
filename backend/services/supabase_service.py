import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

class SupabaseService:
    def __init__(self):
        self.enabled = False
        if SUPABASE_URL and SUPABASE_KEY and "your-project-id" not in SUPABASE_URL:
            try:
                self.client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
                self.enabled = True
            except Exception as e:
                print(f"Supabase connection failed: {e}")
        else:
            print("Supabase credentials not configured. Persistence is disabled.")

    def upsert_project_data(self, table: str, project_id: str, data: dict, text_fields: dict = None):
        if not self.enabled:
            return None
        
        payload = {
            "project_id": project_id,
            "result": data
        }
        if text_fields:
            payload.update(text_fields)
            
        try:
            # We use upsert based on project_id (which has a UNIQUE constraint in the schema)
            result = self.client.table(table).upsert(payload, on_conflict="project_id").execute()
            return result.data
        except Exception as e:
            print(f"Error upserting to {table}: {e}")
            return None

    def save_chat_message(self, project_id: str, role: str, content: str, context: str = None):
        if not self.enabled:
            return None
            
        payload = {
            "project_id": project_id,
            "role": role,
            "content": content,
            "context": context
        }
        try:
            result = self.client.table("chat_messages").insert(payload).execute()
            return result.data
        except Exception as e:
            print(f"Error saving chat: {e}")
            return None

    def create_project(self, name: str = "Untitled Project"):
        if not self.enabled:
            import uuid
            return {"id": str(uuid.uuid4()), "name": name} # Mock project ID if DB disabled
            
        try:
            result = self.client.table("projects").insert({"name": name}).execute()
            return result.data[0]
        except Exception as e:
            print(f"Error creating project: {e}")
            import uuid
            return {"id": str(uuid.uuid4()), "name": name}

    def save_execution(self, project_id: str, output: str, exit_code: int = 0, duration_ms: float = 0):
        if not self.enabled:
            return None
            
        payload = {
            "project_id": project_id,
            "output": output,
            "exit_code": exit_code,
            "duration_ms": duration_ms
        }
        try:
            result = self.client.table("executions").insert(payload).execute()
            return result.data
        except Exception as e:
            print(f"Error saving execution: {e}")
            return None

# Singleton instance
db = SupabaseService()
