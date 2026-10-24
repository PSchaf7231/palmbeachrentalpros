import { useEffect, useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Bell, MessageSquareText } from "lucide-react";
import { AGENT_PHONE_DISPLAY, AGENT_PHONE_TEL, CONSENT_TEXT } from "@/lib/site";

type Mode = "request" | "alerts";
type Status = "idle" | "submitting" | "success" | "error";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

// Remember UTM params for the session so they survive in-page navigation.
function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    const stored = JSON.parse(sessionStorage.getItem("pbrp_utm") ?? "{}") as Record<string, string>;
    Object.assign(out, stored);
  } catch {
    /* ignore */
  }
  const params = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) out[k] = v;
  }
  try {
    sessionStorage.setItem("pbrp_utm", JSON.stringify(out));
  } catch {
    /* ignore */
  }
  return out;
}

const inputCls =
  "w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors";
const labelCls = "block text-xs font-medium text-foreground/80 mb-1";

const REASONS = [
  {
    title: "Early alerts",
    desc: "Get new Palm Beach County rentals sent to you as they come up.",
  },
  {
    title: "Off-market & pre-market rentals",
    desc: "Paul personally sends rentals that match your needs before they hit the portals.",
  },
  {
    title: "Free rental-application help",
    desc: "Get a hand with the application so nothing slows you down.",
  },
  {
    title: "Tour scheduling",
    desc: "Tell Paul when you're free and he'll set up your tours.",
  },
];

export function LeadCapture({
  id,
  source,
  defaultMode,
}: {
  id: string;
  source: string;
  defaultMode: Mode;
}) {
  const uid = useId();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    readUtm();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: mode,
          name: get("name"),
          phone: get("phone"),
          email: get("email"),
          message: get("message"),
          priceMin: get("priceMin"),
          priceMax: get("priceMax"),
          beds: get("beds"),
          areas: get("areas"),
          moveIn: get("moveIn"),
          consent: fd.get("consent") === "on",
          consentText: CONSENT_TEXT,
          source: `${source}:${mode}`,
          pageUrl: window.location.href,
          referrer: document.referrer,
          utm: readUtm(),
          website: get("website"), // honeypot
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again or call Paul.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("We couldn't reach the server. Please check your connection or call Paul.");
      setStatus("error");
    }
  }

  return (
    <section id={id} className="py-8 sm:py-10 scroll-mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start rounded-xl border border-gold/20 bg-card/60 p-5 sm:p-8">
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
              Optional — only if you&apos;d like help
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Not sure what you want?{" "}
              <span className="text-gold">Tell me and I&apos;ll find it.</span>
            </h2>
            <p className="text-sm text-foreground/70 mb-5 leading-relaxed">
              Share what you&apos;re looking for and Paul will personally send you rentals that
              match, or sign up for new-listing alerts. No pressure, and you can keep browsing
              without sharing anything.
            </p>
            <ul className="space-y-3">
              {REASONS.map((r) => (
                <li key={r.title} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-4 w-4 text-gold mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gold/20 bg-background/40 p-4 sm:p-5">
            {status === "success" ? (
              <div className="text-center py-8" role="status" aria-live="polite">
                <div className="mx-auto h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-6 w-6 text-gold" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  Thanks — got it!
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Paul will reach out to you personally. Prefer to talk now?
                </p>
                <a
                  href={`tel:${AGENT_PHONE_TEL}`}
                  className="inline-flex items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition-colors"
                >
                  Call Paul {AGENT_PHONE_DISPLAY}
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2 mb-4" role="tablist" aria-label="Form type">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "request"}
                    onClick={() => setMode("request")}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                      mode === "request"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-gold/20 text-foreground/70 hover:bg-gold/5"
                    }`}
                  >
                    <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                    Tell me what you want
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "alerts"}
                    onClick={() => setMode("alerts")}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                      mode === "alerts"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-gold/20 text-foreground/70 hover:bg-gold/5"
                    }`}
                  >
                    <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                    Get new-listing alerts
                  </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-3" noValidate={false}>
                  {/* Honeypot: hidden from people, bots tend to fill it. */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor={`${uid}-website`}>Website</label>
                    <input
                      id={`${uid}-website`}
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-name`} className={labelCls}>
                      Full name
                    </label>
                    <input
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputCls}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${uid}-phone`} className={labelCls}>
                        Phone
                      </label>
                      <input
                        id={`${uid}-phone`}
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className={inputCls}
                        placeholder="(561) 555-0123"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${uid}-email`} className={labelCls}>
                        Email
                      </label>
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputCls}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {mode === "request" ? (
                    <div>
                      <label htmlFor={`${uid}-message`} className={labelCls}>
                        What are you looking for?{" "}
                        <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <textarea
                        id={`${uid}-message`}
                        name="message"
                        rows={3}
                        maxLength={2000}
                        className={inputCls}
                        placeholder="Area, budget, bedrooms, pets, timing — whatever matters to you."
                      />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`${uid}-pmin`} className={labelCls}>
                            Min price / mo <span className="text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id={`${uid}-pmin`}
                            name="priceMin"
                            type="text"
                            inputMode="numeric"
                            className={inputCls}
                            placeholder="$3,000"
                          />
                        </div>
                        <div>
                          <label htmlFor={`${uid}-pmax`} className={labelCls}>
                            Max price / mo <span className="text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id={`${uid}-pmax`}
                            name="priceMax"
                            type="text"
                            inputMode="numeric"
                            className={inputCls}
                            placeholder="$8,000"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`${uid}-beds`} className={labelCls}>
                            Bedrooms <span className="text-muted-foreground">(optional)</span>
                          </label>
                          <select
                            id={`${uid}-beds`}
                            name="beds"
                            className={inputCls}
                            defaultValue=""
                          >
                            <option value="">Any</option>
                            <option value="Studio">Studio</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5+">5+</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`${uid}-move`} className={labelCls}>
                            Move-in date <span className="text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id={`${uid}-move`}
                            name="moveIn"
                            type="date"
                            className={inputCls}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`${uid}-areas`} className={labelCls}>
                          Areas / communities{" "}
                          <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                          id={`${uid}-areas`}
                          name="areas"
                          type="text"
                          maxLength={300}
                          className={inputCls}
                          placeholder="Boca Raton, West Palm Beach, Delray…"
                        />
                      </div>
                    </>
                  )}

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--gold)]"
                    />
                    <span className="text-[11px] leading-relaxed text-muted-foreground">
                      {CONSENT_TEXT}{" "}
                      <a href="/privacy" className="text-gold underline">
                        Privacy Policy
                      </a>{" "}
                      ·{" "}
                      <a href="/terms" className="text-gold underline">
                        Terms
                      </a>
                      .
                    </span>
                  </label>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-foreground"
                    >
                      {errorMsg}{" "}
                      <a href={`tel:${AGENT_PHONE_TEL}`} className="text-gold underline">
                        Call Paul {AGENT_PHONE_DISPLAY}
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : mode === "request" ? (
                      "Send my request"
                    ) : (
                      "Get new-listing alerts"
                    )}
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Phone and email are required so Paul can reach you. Checking the box is
                    optional.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
