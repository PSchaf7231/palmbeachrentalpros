import { Link } from "@tanstack/react-router";
import { Building2, MapPin, Phone, Users } from "lucide-react";

const AGENT_NAME = "Paul Schafranick";
const AGENT_PHONE_DISPLAY = "561-255-7285";
const AGENT_PHONE_TEL = "+15612557285";
const ADDRESS = "32 SE 2nd Ave #339, Delray Beach, FL 33444";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/10 bg-navy-light/20 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-gold" />
              <span className="font-display text-base font-semibold text-foreground">
                Palm Beach <span className="text-gold">Rental</span> Pros
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Seasonal and annual rentals in Palm Beach County.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Services
            </h4>
            <ul className="space-y-1.5">
              {["Seasonal & Annual Rentals", "Homes for Sale", "Property Management"].map((s) => (
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
                  {AGENT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Palm Beach Rental Pros. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-gold transition-colors">
              Terms
            </Link>
            <p className="text-xs text-muted-foreground">
              Licensed Real Estate Professional in the State of Florida
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
