# Deploy backend to Render

Steps to deploy the `backend` service to Render (manual):

1. Push your repo to GitHub and ensure the latest changes are on the branch you will connect (e.g. `master`).

2. In Render dashboard: `New` → `Web Service` → `Connect a repository` → choose this repo.

3. Service settings:
   - **Name:** `ma-nguon-mo-backend` (or your choice)
   - **Environment:** `Node` (or `Node` runtime)
   - **Branch:** `master` (or your branch)
   - **Root Directory:** `backend`
   - **Build Command:** `npm ci`
   - **Start Command:** `npm run start`
   - **Instance Type / Plan:** Free or as needed

4. Environment variables (Render → Settings → Environment):
   - `DATABASE_URL` = your Postgres connection string (e.g. `postgres://user:pass@host:5432/dbname`) OR if you prefer to continue using SQLite, Render will use `backend/dev.db` which is not recommended for production.

5. (Optional) Add a Render Managed Postgres database from the Render dashboard and copy its `DATABASE_URL` into your service environment variables.

6. After the service is deployed, run migrations and seed (recommended):
   - In Render's dashboard go to your service → **Shell** (one-off shell) and run:
     ```bash
     cd backend
     npx prisma migrate deploy
     npm run seed
     ```
   - Or run the same commands locally if `DATABASE_URL` points to a reachable DB.

7. After migrations + seed complete, your backend API will be available at the service URL, e.g. `https://ma-nguon-mo-backend.onrender.com`.

8. Update frontend (on Vercel) environment variable `VITE_API_URL` to this backend URL, then redeploy frontend.

Troubleshooting:
- If Render build fails, open Build Logs and share them.
- If Prisma fails to connect, double-check `DATABASE_URL` and firewall rules.

Automation: a `render.yaml` file is included in the repo to let you create the service via Render's `render.yaml` infra-as-code if you connect the repo to Render with the `render` CLI or via the dashboard import.
