// Shared site constants (safe for client + server).

export const SITE_URL = "https://palmbeachrentalpros.com";
export const SITE_NAME = "Palm Beach Rental Pros";
export const BROKERAGE_NAME = "VantaSure Realty";
export const AGENT_NAME = "Paul Schafranick";
export const AGENT_PHONE_DISPLAY = "(561) 255-7285";
export const AGENT_PHONE_TEL = "+15612557285";
export const CALL_LABEL = `Call Paul ${AGENT_PHONE_DISPLAY}`;
export const AGENT_EMAIL = "paul@palmbeachrentalpros.com";

// TODO(compliance): set these in Vercel env (Project -> Settings -> Environment Variables).
// They are rendered in the footer ONLY when set, so no placeholder/fake data is shown to visitors.
//   VITE_BROKERAGE_ADDRESS="123 Example St, West Palm Beach, FL 33401"   <- brokerage street address
//   VITE_LICENSE_NUMBER="SL1234567"                                      <- Paul's Florida license #
//   VITE_BROKERAGE_LICENSE_NUMBER="CQ1234567"                            <- brokerage license # (optional)
// VITE_* values are public (bundled into the client) — never put secrets in them.
export function getSiteConfig() {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);
  return {
    brokerageAddress: clean(env.VITE_BROKERAGE_ADDRESS),
    licenseNumber: clean(env.VITE_LICENSE_NUMBER),
    brokerageLicenseNumber: clean(env.VITE_BROKERAGE_LICENSE_NUMBER),
  };
}

export const CONSENT_TEXT =
  "By checking this box, I agree to receive text messages and emails from Palm Beach Rental Pros (Paul Schafranick, VantaSure Realty) about rental listings, alerts, and my inquiry, which may be sent using automated technology to the number and email I provided. Consent is not a condition of any purchase or service. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help.";

// Rentals-only service areas (on-site cards; no external links).
export const RENTAL_AREAS = [
  "Boca Raton",
  "Delray Beach",
  "West Palm Beach",
  "Palm Beach",
  "Jupiter",
  "Boynton Beach",
];
