# MotionPort

Investor one pager for an airport mobility pilot focused on Asian car brands, airport rental operations and fleet validation.

The project is intentionally positioned wider than EV-only rental. The pilot can compare EV, hybrid, combustion, business and premium segments depending on fleet availability, demand and pilot economics.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, CORS
- Storage: `backend/submissions.json`

## Local Development

Frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
```

Backend:

```bash
cd backend
npm install
npm run dev
```

Default URLs:

- Frontend: `http://127.0.0.1:5173/`
- Backend: `http://127.0.0.1:4000`

## API

`GET /api/health`

```json
{ "status": "ok" }
```

`POST /api/contact`

Required fields:

- `name`
- `email`
- `company`
- `role`
- `message`

Submissions are saved locally to `backend/submissions.json`.

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-frontend.yml`.

After pushing to GitHub:

1. Open repository settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Push to `main` or run the workflow manually.

The workflow builds only the frontend and publishes `frontend/dist`.

## Notes

Domain availability, trademarks, fleet terms, airport cooperation, parking costs, charging/fuel costs, damage responsibility and pilot economics require separate verification.
