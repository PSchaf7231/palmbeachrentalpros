import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

const TITLE = "Privacy Policy | Palm Beach Real Estate Pros";
const DESCRIPTION =
  "How Palm Beach Real Estate Pros collects and uses your name, phone number, email, and messages, including text messaging.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://palmbeachrentalpros.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://palmbeachrentalpros.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="text-xs text-muted-foreground">Last updated: November 27, 2026</p>
      <p>
        Palm Beach Real Estate Pros (“we,” “us”) respects your privacy. This policy explains what
        information we collect and how we use it when you visit palmbeachrentalpros.com or contact us.
      </p>
      <h2 className="font-display text-xl font-semibold text-foreground pt-2">Information we collect</h2>
      <p>
        We may collect your name, phone number, email address, and the message you submit via the chat
        widget, call, or text.
      </p>
      <h2 className="font-display text-xl font-semibold text-foreground pt-2">How we use information</h2>
      <p>
        We use this information to respond to you about rentals and to send the texts you opted into.
      </p>
      <p>We do not sell personal information.</p>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.
      </p>
      <h2 className="font-display text-xl font-semibold text-foreground pt-2">Cookies and analytics</h2>
      <p>
        Our website may use cookies and basic analytics to understand how the site is used and to keep
        it working properly.
      </p>
      <h2 className="font-display text-xl font-semibold text-foreground pt-2">How to contact us</h2>
      <p>
        Palm Beach Real Estate Pros
        <br />
        Phone:{" "}
        <a href="tel:+15612557285" className="text-gold hover:text-gold-light">
          (561) 255-7285
        </a>
        <br />
        Email:{" "}
        <a href="mailto:paul@palmbeachrentalpros.com" className="text-gold hover:text-gold-light">
          paul@palmbeachrentalpros.com
        </a>
        <br />
        32 SE 2nd Ave #339, Delray Beach, FL 33444
      </p>
    </LegalLayout>
  );
}
