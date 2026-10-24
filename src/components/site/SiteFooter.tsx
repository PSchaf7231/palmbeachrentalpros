import { Link } from "@tanstack/react-router";
import { Building2, MapPin, Phone, Users } from "lucide-react";
import {
  AGENT_NAME,
  AGENT_PHONE_DISPLAY,
  AGENT_PHONE_TEL,
  BROKERAGE_NAME,
  COMMUNITIES,
  getSiteConfig,
} from "@/lib/site";

// Simple inline Equal Housing Opportunity mark (house outline with an "equals" sign).
function EqualHousingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Equal Housing Opportunity"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22 24 6l18 16" />
      <path d="M10 20v22h28V20" />
      <path d="M17 28h14M17 35h14" />
    </svg>
  );
}

export function SiteFooter() {
  // TODO(compliance): brokerage address and license numbers come from env (see .env.example).
  // Nothing is rendered for a value that isn't configured — no fake data is shown to visitors.
  const { brokerageAddress, licenseNumber, brokerageLicenseNumber } = getSiteConfig();

  return (
    <footer className="border-t border-gold/10 bg-navy-light/20 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-gold" />
              <span className="font-display text-base font-semibold text-foreground">
                Palm Beach <span className="text-gold">Rental</span> Pros
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Palm Beach County&apos;s premier luxury rental specialists.
            </p>
            <p className="text-xs text-foreground/80 font-semibold">{BROKERAGE_NAME}</p>
            {brokerageAddress && (
              <p className="text-xs text-muted-foreground mt-1">{brokerageAddress}</p>
            )}
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Communities
            </h4>
            <ul className="space-y-1.5">
              {COMMUNITIES.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-gold transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Services
            </h4>
            <ul className="space-y-1.5">
              {[
                "Luxury Rentals",
                "Property Management",
                "Tenant Placement",
                "Investment Consulting",
                "Market Analysis",
              ].map((s) => (
                <li key={s}>
                  <span className="text-xs text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Users className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{AGENT_NAME}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${AGENT_PHONE_TEL}`}
                  className="text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  Call Paul {AGENT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Palm Beach County, FL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-5 space-y-3">
          <div className="flex items-start gap-3">
            <EqualHousingIcon className="h-9 w-9 text-foreground/80 flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground/80">Equal Housing Opportunity.</span>{" "}
              We are pledged to the letter and spirit of U.S. policy for the achievement of equal
              housing opportunity throughout the Nation. We encourage and support an affirmative
              advertising and marketing program in which there are no barriers to obtaining housing
              because of race, color, religion, sex, handicap, familial status, or national origin.
            </p>
          </div>
          {(licenseNumber || brokerageLicenseNumber) && (
            <p className="text-[11px] text-muted-foreground">
              {licenseNumber && (
                <>
                  {AGENT_NAME}, Florida real estate license #{licenseNumber}.{" "}
                </>
              )}
              {brokerageLicenseNumber && (
                <>
                  {BROKERAGE_NAME}, license #{brokerageLicenseNumber}.
                </>
              )}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] text-muted-foreground">
              &copy; {new Date().getFullYear()} Palm Beach Rental Pros. All rights reserved.
            </p>
            <nav className="flex items-center gap-4 text-[11px]" aria-label="Legal">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-gold transition-colors">
                Terms of Use
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
