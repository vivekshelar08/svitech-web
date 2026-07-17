# Svitech Web — SVITECH Foundation

Public nonprofit website for **SVITECH Foundation**.

Production: **https://svitech.in**

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Supabase (forms, donations, CMS) — optional; falls back to `src/content/` + local `data/`
- Razorpay (one-time + monthly donations; no crypto)
- Resend (receipts + team notifications)
- Hosted on **Hostinger** Node.js

## Features

- `/donate` — one-time & monthly Razorpay checkout + thank-you receipt email
- `/volunteer`, `/contact`, newsletter — saved to Supabase (or `data/submissions`)
- `/impact` — stories + location metrics
- `/reports` — annual reports + board
- `/events` — listings + registration
- `/news` — articles (file CMS or Supabase)
- `/programs/[slug]` — program detail pages
- `/admin` — inbox + publish news (password-protected)

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend setup

1. Create a Supabase project and run `supabase/migrations/20260716120000_ngo_platform.sql` in the SQL Editor.
2. Add Supabase URL + anon key (+ service role for admin CMS).
3. Create a Razorpay account; add key id/secret. Point webhook to `https://svitech.in/api/donate/webhook`.
4. Create a Resend API key for donation receipts and form alerts.
5. Set `ADMIN_PASSWORD` for `/admin`.

Without keys, the site still runs: content comes from `src/content/`, forms write to `data/submissions/`, and donate shows a configure message.

## Deploy on Hostinger

Production URL: **https://svitech.in**

Repo: [github.com/vivekshelar08/svitech-web](https://github.com/vivekshelar08/svitech-web) (branch `main`)

### Deploy settings

| Setting | Value |
|---------|--------|
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `next start -H 0.0.0.0 -p $PORT` |
| Node.js version | **20** |

### Environment variables

Copy from `.env.example`. At minimum set:

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_APP_URL` | `https://svitech.in` |

# Plus Supabase, Razorpay, Resend, and `ADMIN_PASSWORD` for full backend features.
#
# For live donations in Supabase, also set `SUPABASE_SERVICE_ROLE_KEY`
# (server-only) so payment status can be updated after checkout.

### Post-deploy checks

- Open https://svitech.in
- `GET https://svitech.in/api/live` should return `{ "ok": true, ... }`
- Submit `/contact` and confirm row in Supabase (or `data/` locally)
- Test `/donate` in Razorpay test mode

**Idle 503s?** Hostinger can sleep inactive Node apps. Point a free [UptimeRobot](https://uptimerobot.com) monitor at `/api/live` every 5 minutes.

## Pages

- `/` — Home
- `/about` — Mission & values
- `/programs` — Programs (+ detail pages)
- `/impact` — Impact stories
- `/events` — Events + registration
- `/news` — News
- `/get-involved` — Volunteer / partner / donate paths
- `/volunteer` — Volunteer application
- `/donate` — Donations
- `/reports` — Reports & board
- `/contact` — Contact form
- `/admin` — Staff login, inbox, and CMS for all site content

### Admin CMS (`/admin`)

Set these env vars on Hostinger:

```env
ADMIN_EMAIL=info@svitech.in
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=optional-stable-secret
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...   # for password-reset emails
```

Run the latest Supabase migration (`site_settings` + `admin_credentials`) so settings sync to the database. Without it, settings and custom passwords still save under `data/`.

After login you can:

- Review contact, volunteer, newsletter, donation, and event submissions
- Create/edit/publish/unpublish/delete **News**, **Events**, **Programs**, **Impact**, and **Reports**
- Edit **Site settings** (name, contact email, SEO, footer)
- Edit **Page copy** placeholders (home, about, get involved, contact)
- Manage **Board** members shown on Reports
- Change password, or use **Forgot password?** on the login screen
- Import starter content from the codebase into Supabase (Dashboard tab)

Login uses a secure httpOnly cookie (12-hour session). A custom password set in Account overrides `ADMIN_PASSWORD` for login.
