# Palm Beach Rental Pros

Marketing / lead-capture site for [palmbeachrentalpros.com](https://palmbeachrentalpros.com).

**Stack:** TanStack Start (React 19, SSR) · Vite 8 · Tailwind CSS 4 · Nitro (deploys to Vercel).

## Develop

```sh
bun install
bun run dev        # http://localhost:5173
bun run build      # production build (Nitro; emits .vercel/output on Vercel, .output/ locally)
bun run preview
```

## Environment variables

Copy `.env.example` to `.env` for local work. In production set them in
Vercel → Project → Settings → Environment Variables, then redeploy.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GHL_WEBHOOK_URL` | **Yes** | GoHighLevel "Inbound Webhook" trigger URL. The `/api/lead` route POSTs every lead here as JSON. If it is unset in production, the form shows an error (it never fakes success). |
| `VITE_BROKERAGE_ADDRESS` | Before launch | Brokerage street address, shown in the footer only when set. |
| `VITE_LICENSE_NUMBER` | Before launch | Agent license #, shown in the footer only when set. |
| `VITE_BROKERAGE_LICENSE_NUMBER` | Optional | Brokerage license #, shown in the footer only when set. |

### Wiring leads to GoHighLevel

1. GHL → Automation → Workflows → Create Workflow → trigger **Inbound Webhook**.
2. Copy the webhook URL into `GHL_WEBHOOK_URL` (Vercel env, Production + Preview).
3. Submit a test lead on the site, then in the workflow trigger click "Fetch sample requests" and map fields
   (`first_name`, `last_name`, `phone`, `email`, `form_type`, `message`, `price_min`, `price_max`, `beds`, `areas`,
   `move_in_date`, `sms_email_consent`, `consent_text`, `source`, `page_url`, `utm_*`).
4. Only text leads where `sms_email_consent` is `true`.

## Project notes

- `src/routes/index.tsx` — home page (search placeholder, lead forms, rentals by area, how-it-works, footer).
- `src/routes/api.lead.ts` — `POST /api/lead` server route (validation, honeypot, webhook forward).
- `src/routes/privacy.tsx`, `terms.tsx` — **draft** legal pages; have the broker/attorney review before launch.
- `src/routes/sitemap[.]xml.ts`, `public/robots.txt` — SEO; canonical host is `https://palmbeachrentalpros.com`.
- The IDX / rental search block is a placeholder until the BoldTrail embed is provided.
