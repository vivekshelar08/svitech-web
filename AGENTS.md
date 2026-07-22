<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Product: single Next.js 16 (App Router) + TypeScript site for SVITECH Foundation. Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`). Node 20+ required (VM has Node 22, which is fine).
- The app boots and serves every page with **zero external services**. Integrations (Supabase, Razorpay, Resend, admin CMS) are env-gated in `src/lib/env.ts` and fall back gracefully: content from `src/content/`, form/donation submissions to local `data/submissions/*.json`, donate page shows a "configure" message, emails no-op. So `npm run dev` alone is enough to develop and test the public site.
- Copy `.env.example` to `.env.local` before running; all keys can be left blank for a basic run. `.env*` and `/data/` are gitignored (test submissions won't be committed).
- Run: `npm run dev` (Turbopack, http://localhost:3000). Health check: `GET /api/live` returns `{"ok":true,...}` with a `backend` flags object showing which integrations are configured.
- Lint (`npm run lint`) currently reports pre-existing `react-hooks/set-state-in-effect` errors in `src/components/**` unrelated to environment setup; they are not caused by dependency install.
- Full end-to-end donation persistence / real payments / emails require Supabase + Razorpay + Resend keys; admin `/admin` login requires `ADMIN_PASSWORD`. Supabase schema is set up by running the SQL files in `supabase/migrations/` in the Supabase SQL editor.
