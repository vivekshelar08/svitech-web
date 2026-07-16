# Svitech Web — SVITECH Foundation

Public nonprofit website for **SVITECH Foundation**.

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

Suggested production URL: **https://www.svitech.in** (or root `svitech.in` / another subdomain you choose).

Svitech HR already uses `svihr.svitech.in` — keep this site on a separate Node.js website + domain.

### 1. Push to GitHub

Create a repo (e.g. `svitech-web`) and push `main`:

```bash
git add .
git commit -m "Initial SVITECH Foundation website"
git remote add origin https://github.com/<your-user>/svitech-web.git
git push -u origin main
```

Hostinger can deploy directly from GitHub — no separate deploy workflow required.

### 2. DNS (`svitech.in` on Hostinger)

1. **Websites** → select `svitech.in` → **DNS / DNS Zone**
2. Add a record for your chosen host, for example:
   - **Type:** `CNAME`
   - **Name:** `www` (or `web`, etc.)
   - **Target:** the hostname Hostinger shows for the Node.js site
3. Wait for DNS propagation

### 3. Node.js website

1. **Websites** → **Add Website** → **Node.js**
2. **Import from GitHub** → select this repo, branch `main`
3. Attach the domain (e.g. `www.svitech.in`)
4. Use these **exact** settings:

| Setting | Value |
|---------|--------|
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `next start -H 0.0.0.0 -p $PORT` |
| Node.js version | **20** |

Use the start command exactly as shown so Hostinger binds Next.js to `$PORT`.

5. Enable **HTTPS** (Hostinger usually provisions SSL automatically)

### 4. Environment variables

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_APP_URL` | `https://www.svitech.in` (your real URL) |

Redeploy after saving env vars.

### 5. Post-deploy checks

- Open the site URL in a browser
- `GET /api/live` should return `{ "ok": true, ... }`

**Idle 503s?** Hostinger can sleep inactive Node apps. Point a free [UptimeRobot](https://uptimerobot.com) monitor at `/api/live` every 5 minutes.

## Pages

- `/` — Home
- `/about` — Mission & values
- `/programs` — Programs
- `/get-involved` — Volunteer / donate
- `/contact` — Contact form
