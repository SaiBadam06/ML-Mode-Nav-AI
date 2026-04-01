# ModelNavigator AI

From Problem to Pipeline — Your Intelligent Guide to Machine Learning Success.

## 🚀 Getting Started

ModelNavigator AI is a powerful tool designed to transform natural language problem descriptions into comprehensive, actionable machine learning blueprints.

### 🛠️ Prerequisites

- **Python 3.9+** (for the backend)
- **Node.js 18+** & **npm** (for the frontend)
- **Supabase Account** (for data persistence)

### ⚙️ Setup Instructions

#### 1. Configuration (Backend)
Navigate to the `backend/` directory, copy the sample environment file, and add your API keys:
```bash
cd backend
cp .env.example .env
```
Fill in your keys for **Groq**, **NVIDIA**, and **Supabase**.

#### 2. Database (Supabase)
Run the [supabase_schema.sql](supabase_schema.sql) file in your Supabase SQL Editor to create the necessary tables.

#### 3. Installation & Execution

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🏗️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS (Premium Dark Mode Glassmorphism)
- **Backend**: FastAPI, Pydantic, httpx
- **AI/ML Logic**: Groq (Llama-3), NVIDIA NIM (Architecture Visualization)
- **Persistence**: Supabase
