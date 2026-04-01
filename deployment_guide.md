# Deployment Guide — Render & Vercel

Follow these steps to deploy ModelNavigator AI to the cloud.

---

## 1. Backend Deployment (Render)
Render is ideal for the FastAPI backend.

1.  **Preparation**: Push your latest code to GitHub.
2.  **Create Service**: Log in to [Render](https://render.com/) and click **"New" > "Web Service"**.
3.  **Connect Repo**: Connect your GitHub repository.
4.  **Settings**:
    *   **Name**: `modelnavigator-api`
    *   **Runtime**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt` (Ensure the "Root Directory" is set to `backend` or adjust the command to `pip install -r backend/requirements.txt`).
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5.  **Environment Variables**: Go to the **"Environment"** tab and add:
    *   `GROQ_API_KEY`: (Your key)
    *   `NVIDIA_API_KEY`: (Your key)
    *   `SUPABASE_URL`: (Your URL)
    *   `SUPABASE_KEY`: (Your Key)
    *   `ALLOWED_ORIGINS`: `https://your-app-name.vercel.app` (You'll update this after Vercel deployment).

---

## 2. Frontend Deployment (Vercel)
Vercel is the gold standard for React/Vite applications.

1.  **Create Project**: Log in to [Vercel](https://vercel.com/) and click **"Add New" > "Project"**.
2.  **Connect Repo**: Import your GitHub repository.
3.  **Project Settings**:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `frontend`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Environment Variables**: Add:
    *   `VITE_API_URL`: `https://modelnavigator-api.onrender.com/api` (The URL of your Render web service).

---

## 3. Post-Deployment Sync
Once the frontend is live:
1.  Copy your Vercel URL (e.g., `https://modelnavigator-ai.vercel.app`).
2.  Go back to **Render** and update the `ALLOWED_ORIGINS` environment variable to match that URL.
3.  Restart the Render service.

> [!TIP]
> Always ensure your `VITE_API_URL` ends with `/api` as configured in the backend routes.
