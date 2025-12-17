# Sample React + Node Project

Structure:
- frontend: Vite + React app
- backend: Express API that serves `/api/hello`

Run locally:

1) Install deps for both folders

```bash
cd frontend
npm install
cd ../backend
npm install
```

2) Run backend and frontend for development

```bash
# in one terminal
cd backend
npm start

# in another terminal
cd frontend
npm run dev
```

The frontend dev server proxies requests to `/api/hello` by requesting same-origin path. For production you can build the frontend (`npm run build` in `frontend`) and serve `frontend/dist` from the backend.

Deploying frontend to Vercel:

1. Create a Vercel account and link your GitHub repo.
2. In Vercel project settings set the root directory to `frontend` (or deploy the `frontend` folder directly).
3. Build command: `npm run build`; Output directory: `dist`.
