# Svitech Web — SVITECH Foundation

Public nonprofit website for **SVITECH Foundation**.

Production: **https://svitech.in**

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Hosted on **Hostinger** Node.js (same pattern as Svitech HR / NGO Hub)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Hostinger

Production URL: **https://svitech.in**

Repo: [github.com/vivekshelar08/svitech-web](https://github.com/vivekshelar08/svitech-web) (branch `main`)

Svitech HR uses `svihr.svitech.in` — this site is the apex domain Node.js app.

### Deploy settings

| Setting | Value |
|---------|--------|
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `next start -H 0.0.0.0 -p $PORT` |
| Node.js version | **20** |

Use the start command exactly as shown so Hostinger binds Next.js to `$PORT`.

Enable **HTTPS** (Hostinger usually provisions SSL automatically).

### Environment variables

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_APP_URL` | `https://svitech.in` |

Redeploy after saving env vars **and** after pulling the latest `main` (Tailwind/PostCSS build packages are production dependencies so Hostinger installs them).

### Post-deploy checks

- Open https://svitech.in
- `GET https://svitech.in/api/live` should return `{ "ok": true, ... }`

**Idle 503s?** Hostinger can sleep inactive Node apps. Point a free [UptimeRobot](https://uptimerobot.com) monitor at `/api/live` every 5 minutes.

## Pages

- `/` — Home
- `/about` — Mission & values
- `/programs` — Programs
- `/get-involved` — Volunteer / donate
- `/contact` — Contact form
