Production readiness checklist — IGRIS Tech frontend

Goal: Keep the exact frontend visuals, wire to your FastAPI backend, and build for production.

1) Set environment variable

Set `VITE_API_BASE_URL` to your backend base URL. Example:

```bash
export VITE_API_BASE_URL="https://api.my-igris.com"
# or for local production testing
export VITE_API_BASE_URL="http://127.0.0.1:8000"
```

When using a process manager or CI/CD (Vercel, Netlify, Docker, etc.), set the environment variable in the project settings.

2) Build the production bundle

```bash
# install deps (if needed)
npm ci
# build (this runs `vite build` via project scripts)
npm run build
```

3) Serve the built site for preview

```bash
# preview the production build locally
npm run preview:restart
# or use a static server that serves `dist/` or the configured output
```

4) Backend CORS and origin

Ensure your FastAPI backend allows requests from the deployed frontend origin. Example FastAPI CORS middleware configuration:

```py
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.example.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

During local testing with `npm run dev` on `http://localhost:8080`, set `allow_origins` to include `http://localhost:8080` (or use `*` only for short-lived local testing).

5) Admin usage and secrets

This frontend stores an admin password in `sessionStorage` only when explicitly set in the admin UI (no default password). To perform admin actions, set the admin password in the admin UI or the session storage before using admin endpoints.

6) Verify endpoints

Check the backend OpenAPI:

- `GET ${process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/openapi.json`
- `GET ${process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/projects`

The frontend will use `VITE_API_BASE_URL` via `src/lib/api.ts`.

7) Smoke test

- Open the frontend in a browser and navigate to the homepage. The Selected Work section should fetch published projects from the backend. If the backend is unreachable, the UI falls back to the local mock data.
- Submit the contact form and verify the backend receives the inquiry.
- In the admin UI, create/update/delete a project and verify it propagates to the backend.

If you want, I can:
- Wire the admin project form image preview next (I can implement the live preview behavior),
- Or run a full QA pass against your running backend (`http://127.0.0.1:8000`) from this workspace.

