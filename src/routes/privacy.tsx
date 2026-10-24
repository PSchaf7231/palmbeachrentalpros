import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { AGENT_EMAIL, AGENT_PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Palm Beach Rental Pros" },
      {
        name: "description",
        content:
          "How Palm Beach Rental Pros collects, uses, and protects your information, including text-message (SMS) terms.",
      },
      // TODO: remove noindex once the policy is reviewed and approved.
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="DRAFT — date to be set on approval">
      <section>
        <p>
          Palm Beach Rental Pros (&ldquo;we,&rdquo; &ldquo;us&rdquo;), operated by Paul Schafranick
          of VantaSure Realty, respects your privacy. This policy explains what we collect through{" "}
          {SITE_URL.replace("https://", "")} and how we use it.
        </p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            Information you give us: name, phone number, email address, and rental preferences
            (budget, bedrooms, areas, move-in date, notes).
          </li>
          <li>
            Automatically collected: page URL, referring site, campaign (UTM) parameters, browser
            and device data, and similar technical information.
          </li>
          <li>
            Records of your consent to receive texts or emails, including the wording shown and the
            time you agreed.
          </li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your requests, find and send you rentals, and schedule tours.</li>
          <li>
            To send new-listing alerts and follow-ups you asked for, by text, email, or phone.
          </li>
          <li>To operate, secure, and improve this website.</li>
          <li>To comply with legal and MLS/brokerage requirements.</li>
        </ul>
      </section>
      <section>
        <h2>Text messages (SMS) and email</h2>
        <p>
          If you check the consent box on our forms, you agree to receive text messages and emails
          from us about rental listings, alerts, and your inquiry, sent using automated technology
          to the number and email you provided. Consent is not a condition of any purchase or
          service. Message frequency varies. Message and data rates may apply. Reply{" "}
          <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for help. You can
          also contact us at {AGENT_PHONE_DISPLAY} or{" "}
          <a href={`mailto:${AGENT_EMAIL}`}>{AGENT_EMAIL}</a>.
        </p>
        <p>
          <strong>
            Mobile information, including phone numbers and SMS opt-in consent, will not be shared
            with third parties or affiliates for marketing or promotional purposes.
          </strong>{" "}
          Information may be shared with service providers who help us deliver messages (for
          example, our CRM and messaging platform) solely to provide those services to us.
        </p>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We share it only with service providers acting
          on our behalf (website hosting, CRM, messaging, analytics), with our brokerage as needed
          to serve you, when required by law, or with your direction.
        </p>
      </section>
      <section>
        <h2>Cookies and analytics</h2>
        <p>
          We may use cookies or similar technologies and analytics tools to understand how the site
          is used. You can control cookies in your browser settings.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct, or delete your information, or to stop contacting you,
          by contacting us using the details below.
        </p>
      </section>
      <section>
        <h2>Security and retention</h2>
        <p>
          We use reasonable safeguards, but no method of transmission is completely secure. We keep
          information only as long as needed for the purposes above or as required by law.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p>
          This site is not directed to children under 13, and we do not knowingly collect their
          information.
        </p>
      </section>
      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update this policy and will post changes here. Questions: {AGENT_PHONE_DISPLAY} or{" "}
          <a href={`mailto:${AGENT_EMAIL}`}>{AGENT_EMAIL}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
