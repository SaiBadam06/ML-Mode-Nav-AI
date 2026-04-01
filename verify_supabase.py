import os
import sys
from unittest.mock import MagicMock

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), "backend"))

def test_supabase_service():
    print("Testing SupabaseService initialization...")
    from services.supabase_service import db
    
    if db.enabled:
        print("✅ Supabase is configured and enabled.")
    else:
        print("ℹ️ Supabase is not configured (this is expected if the user hasn't added keys yet).")
        print("ℹ️ Persistence will be skipped, but the app will continue to function.")

    print("\nTesting Mock Project Creation...")
    project = db.create_project("Test Project")
    print(f"Project result: {project}")
    
    if "id" in project:
        print("✅ Project ID generated successfully.")
    else:
        print("❌ Project ID generation failed.")

    print("\nTesting Analysis Upsert (Mock)...")
    result = db.upsert_project_data(
        table="analyses",
        project_id=project.get("id"),
        data={"test": "data"},
        text_fields={"problem_text": "test problem"}
    )
    print(f"Upsert result: {result}")
    
    print("\nVerification Complete! 🚀")

if __name__ == "__main__":
    test_supabase_service()
