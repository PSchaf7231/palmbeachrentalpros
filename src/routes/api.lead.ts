import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { leadSchema } from "@/lib/lead";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "Invalid request." }, 400);
        }

        const parsed = leadSchema.safeParse(raw);
        if (!parsed.success) {
          return json(
            { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." },
            400,
          );
        }
        const lead = parsed.data;

        // Honeypot tripped: pretend success to the bot, forward nothing.
        if (lead.website) {
          return json({ ok: true });
        }

        const [firstName, ...rest] = lead.name.split(/\s+/);
        const payload = {
          first_name: firstName,
          last_name: rest.join(" "),
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          form_type: lead.formType,
          message: lead.message,
          price_min: lead.priceMin,
          price_max: lead.priceMax,
          beds: lead.beds,
          areas: lead.areas,
          move_in_date: lead.moveIn,
          sms_email_consent: lead.consent,
          consent_text: lead.consent ? lead.consentText : "",
          consent_timestamp: lead.consent ? new Date().toISOString() : "",
          source: lead.source,
          page_url: lead.pageUrl,
          referrer: lead.referrer,
          ...Object.fromEntries(Object.entries(lead.utm).map(([k, v]) => [k, v])),
          submitted_at: new Date().toISOString(),
          site: "palmbeachrentalpros.com",
        };

        // Read env INSIDE the handler (required on edge/serverless runtimes).
        const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
        if (!webhookUrl) {
          // TODO: set GHL_WEBHOOK_URL (see README / .env.example). Never fake success in production.
          console.error(
            "[api/lead] GHL_WEBHOOK_URL is not set — lead NOT delivered. TODO: configure the env var.",
            JSON.stringify(payload),
          );
          if (process.env.NODE_ENV === "production") {
            return json(
              { ok: false, error: "We couldn't submit this right now. Please call Paul instead." },
              503,
            );
          }
          return json({
            ok: true,
            delivered: false,
            todo: "GHL_WEBHOOK_URL is not set; lead was logged only (dev mode).",
          });
        }

        try {
          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10_000),
          });
          if (!res.ok) {
            console.error(`[api/lead] webhook responded ${res.status}`);
            return json(
              { ok: false, error: "We couldn't submit this right now. Please call Paul instead." },
              502,
            );
          }
          return json({ ok: true, delivered: true });
        } catch (err) {
          console.error("[api/lead] webhook request failed", err);
          return json(
            { ok: false, error: "We couldn't submit this right now. Please call Paul instead." },
            502,
          );
        }
      },
    },
  },
});
