import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { AGENT_EMAIL, AGENT_PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Palm Beach Rental Pros" },
      {
        name: "description",
        content:
          "Terms of use for palmbeachrentalpros.com, including text-message (SMS) program terms.",
      },
      // TODO: remove noindex once the terms are reviewed and approved.
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalLayout title="Terms of Use" updated="DRAFT — date to be set on approval">
      <section>
        <h2>Acceptance</h2>
        <p>
          By using {SITE_URL.replace("https://", "")} (the &ldquo;Site&rdquo;), operated by Palm
          Beach Rental Pros (Paul Schafranick, VantaSure Realty), you agree to these terms. If you
          do not agree, please do not use the Site.
        </p>
      </section>
      <section>
        <h2>Information is not a guarantee</h2>
        <p>
          Listing information, prices, and availability are provided for general information, are
          subject to change without notice, and are not guaranteed. Verify all details
          independently. Nothing on the Site is legal, tax, or financial advice.
        </p>
      </section>
      <section>
        <h2>Use of the Site</h2>
        <ul>
          <li>
            Use the Site only for lawful, personal, non-commercial purposes related to finding a
            rental.
          </li>
          <li>
            Do not scrape, copy, or resell Site content or listing data, or interfere with the
            Site&apos;s operation.
          </li>
          <li>Information you submit must be accurate and belong to you.</li>
        </ul>
      </section>
      <section>
        <h2>Text message program (SMS terms)</h2>
        <ul>
          <li>
            <strong>Program:</strong> Palm Beach Rental Pros rental alerts and follow-up messages.
          </li>
          <li>
            <strong>Consent:</strong> By checking the consent box on our forms you agree to receive
            recurring text messages and emails, including by automated technology, at the number and
            email you provided. Consent is not a condition of any purchase or service.
          </li>
          <li>
            <strong>Frequency:</strong> Message frequency varies.
          </li>
          <li>
            <strong>Cost:</strong> Message and data rates may apply.
          </li>
          <li>
            <strong>Opt out:</strong> Reply <strong>STOP</strong> at any time to cancel. You may
            receive one final confirmation message.
          </li>
          <li>
            <strong>Help:</strong> Reply <strong>HELP</strong> or contact {AGENT_PHONE_DISPLAY} /{" "}
            <a href={`mailto:${AGENT_EMAIL}`}>{AGENT_EMAIL}</a>.
          </li>
          <li>
            <strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.
          </li>
          <li>
            <strong>Privacy:</strong> See our <a href="/privacy">Privacy Policy</a>. Mobile opt-in
            data and consent are not shared with third parties or affiliates for marketing purposes.
          </li>
        </ul>
      </section>
      <section>
        <h2>Third-party links</h2>
        <p>
          The Site links to third-party websites (including community sites). We are not responsible
          for their content or practices.
        </p>
      </section>
      <section>
        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest
          extent permitted by law, we are not liable for any indirect, incidental, or consequential
          damages arising from your use of the Site.
        </p>
      </section>
      <section>
        <h2>Fair housing</h2>
        <p>
          We are committed to equal housing opportunity and comply with federal, state, and local
          fair housing laws.
        </p>
      </section>
      <section>
        <h2>Governing law and changes</h2>
        <p>
          These terms are governed by the laws of the State of Florida. We may update them at any
          time by posting changes here. Contact: {AGENT_PHONE_DISPLAY} or{" "}
          <a href={`mailto:${AGENT_EMAIL}`}>{AGENT_EMAIL}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
