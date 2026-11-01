# Swasthya Setu — Vercel + Render deployment

This repository combines the React/Vite frontend and Express/Gemini backend in one project. **Saathi** is the floating health-information chatbot in the frontend and is served by the backend at `POST /api/saathi/chat`. Prescription extraction remains available at `POST /api/ai/analyze-prescription`.

## Architecture

```text
Browser / Vercel frontend
  ├── React dashboard and Saathi chat widget
  └── VITE_API_BASE_URL ───────────────┐
                                       ▼
                           Express API / Render
                             ├── GET /api/health
                             ├── POST /api/saathi/chat ── Gemini
                             └── POST /api/ai/analyze-prescription ── Gemini
```

The Gemini API key must only be configured on the backend. Never put it in a `VITE_*` variable or commit it to source control.

## Run locally

Requirements: Node.js 20+ and npm.

### Backend terminal

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then set `GEMINI_API_KEY` to a valid Google AI Studio key. Start:

```bash
npm run dev
```

Backend health check: `http://localhost:5000/api/health`

### Frontend terminal

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env`. For local development, keep:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start:

```bash
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`).

## Your supplied deployment URLs

- Frontend: https://medlink-sand-seven.vercel.app
- Backend origin: https://medlink-8vbl.onrender.com
- Backend API docs supplied: https://medlink-8vbl.onrender.com/docs/#/

The production frontend build configuration in `frontend/.env.production` points to the backend origin above. Also set `VITE_API_BASE_URL` to `https://medlink-8vbl.onrender.com` in Vercel Project Settings → Environment Variables and redeploy, so the build-time setting is explicit.

**Important compatibility check:** this frontend expects `GET /api/health`, `POST /api/saathi/chat`, and `POST /api/ai/analyze-prescription`. The Render service must implement these exact routes and response shapes. A Swagger docs URL alone does not prove that those routes exist. If the currently deployed backend comes from another codebase, deploy this package's `backend/` folder to Render (Root Directory `backend`, Build `npm install`, Start `npm start`) or adapt the frontend API client to the actual OpenAPI schema.

## Deploy the backend to Render

1. Push the repository to a Git provider accessible by Render.
2. Create a **Web Service** from the repository.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Health check path: `/api/health`
7. Add environment variables in Render:
   - `GEMINI_API_KEY` = your private Gemini API key
   - `GEMINI_CHAT_MODEL` = `gemini-2.5-flash` (change only to a model enabled for your key)
   - `FRONTEND_ORIGIN` = the exact deployed Vercel origin, e.g. `https://your-app.vercel.app` (no trailing slash). For preview deployments, add comma-separated origins if you want to allow them.
8. Deploy and confirm `https://YOUR-RENDER-SERVICE.onrender.com/api/health` returns JSON with `success: true`.

A `backend/render.yaml` Blueprint file is included as a deployment starting point. Confirm the values in the Render dashboard after import.

## Deploy the frontend to Vercel

1. Import the same repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variable:
   - `VITE_API_BASE_URL` = the full Render service origin, e.g. `https://YOUR-RENDER-SERVICE.onrender.com` (no trailing slash)
7. Deploy again after adding/changing the variable. Vite embeds `VITE_*` values at build time.
8. Once the Vercel domain is final, add that exact origin to Render's `FRONTEND_ORIGIN` and redeploy/restart the backend.

`frontend/vercel.json` includes an SPA rewrite so Vercel serves the app on direct navigation and refresh.

## API contract

### Saathi chat

`POST /api/saathi/chat`

```json
{
  "message": "What should I bring to a doctor visit?",
  "history": [
    { "role": "user", "text": "I have an appointment tomorrow." },
    { "role": "model", "text": "You can prepare a list of questions." }
  ]
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "reply": "A list of your symptoms, current medicines, allergies, and questions can help...",
    "assistant": "Saathi",
    "disclaimer": "Saathi provides general information, not diagnosis or treatment. For medical concerns, consult a qualified healthcare professional."
  }
}
```

The frontend sends recent conversation context; the backend limits the amount of history and message size. If the API key is missing or the AI provider is unavailable, the endpoint returns an honest error rather than a simulated answer.

### Prescription extraction

`POST /api/ai/analyze-prescription` — multipart/form-data field named `prescription`; accepts JPG, PNG, WEBP and PDF up to 8 MB. Returned fields must be verified by a person; the feature is not a diagnosis or medication recommendation.

## Verification checklist

- [ ] `GET /api/health` returns HTTP 200 on the deployed Render URL.
- [ ] Saathi sends a message and displays a real backend response with a valid `GEMINI_API_KEY`.
- [ ] Without a key, Saathi displays a clear configuration error rather than fake content.
- [ ] A valid prescription upload reaches the backend; invalid type/oversized uploads show errors.
- [ ] Browser devtools Network tab shows requests going to the configured Render URL.
- [ ] CORS permits the deployed Vercel origin and rejects unintended origins.
- [ ] Vercel build completes successfully.
- [ ] No secret key is exposed in the Vercel build output or committed files.

## Important scope and safety notes

Saathi provides general health information only. It does not diagnose, prescribe, access a patient's records, book appointments, synchronize ABHA/ABDM, contact clinicians, or dispatch emergency services. In India, call 112 for an emergency. Do not enter unnecessary personal identifiers or real patient data into a demo. Production healthcare use requires a privacy/security review, appropriate consent and retention controls, authentication/authorization, monitoring, and any required legal/compliance review.
