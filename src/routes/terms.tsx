import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

const TITLE = "Terms of Use | Palm Beach Real Estate Pros";
const DESCRIPTION =
  "Website terms and SMS terms for Palm Beach Real Estate Pros, including message frequency, rates, and how to opt out.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://palmbeachrentalpros.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://palmbeachrentalpros.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Use">
      <p className="text-xs text-muted-foreground">Last updated: November 27, 2026</p>
      <p>
        These terms apply to the Palm Beach Real Estate Pros website at palmbeachrentalpros.com. By
        using this site, you agree to these terms.
      </p>
      <p>
        The information on this website is for general informational purposes only. Property listings
        and other details are subject to change and should be independently verified. We do not
        guarantee the accuracy, availability, or completeness of any listing or other content on this
        site.
      </p>
      <p>These terms are governed by the laws of the State of Florida.</p>
      <h2 className="font-display text-xl font-semibold text-foreground pt-2">SMS Terms</h2>
      <p>
        Program name: Palm Beach Real Estate Pros. You may receive messages about rental inquiries,
        showings, and marketing. Message frequency varies. Msg &amp; data rates may apply. Reply STOP
        to opt out and HELP for help. Carriers are not liable for delayed or undelivered messages.
        Consent is not a condition of purchase.
      </p>
      <p>
        See our{" "}
        <Link to="/privacy" className="text-gold hover:text-gold-light">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalLayout>
  );
}
