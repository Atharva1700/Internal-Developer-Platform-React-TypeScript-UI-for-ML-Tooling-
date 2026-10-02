# ML Evaluation Platform

Internal developer platform for triggering and inspecting model evaluation runs.

## Structure

- **frontend/**: React/TypeScript UI for triggering evals and viewing results
- **backend/**: FastAPI service exposing evaluation endpoints

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 to trigger evaluations.
