import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchBox } from "@/components/site/SearchBox";
import { Phone, Mail, MapPin, Building2, ArrowRight, Shield, Key, Users, Search, DollarSign, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palm Beach Rental Pros | Seasonal & Annual Rentals, Palm Beach County" },
      {
        name: "description",
        content:
          "Seasonal and annual rentals across Palm Beach County, from Jupiter to West Palm Beach to Boca Raton, with Paul Schafranick.",
      },
      {
        property: "og:title",
        content: "Palm Beach Rental Pros | Seasonal & Annual Rentals, Palm Beach County",
      },
      {
        property: "og:description",
        content:
          "Seasonal and annual rentals across Palm Beach County, from Jupiter to West Palm Beach to Boca Raton, with Paul Schafranick.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://palmbeachrentalpros.com/" },
      { property: "og:site_name", content: "Palm Beach Rental Pros" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Palm Beach Rental Pros | Seasonal & Annual Rentals, Palm Beach County" },
      {
        name: "twitter:description",
        content:
          "Seasonal and annual rentals across Palm Beach County, from Jupiter to West Palm Beach to Boca Raton, with Paul Schafranick.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://palmbeachrentalpros.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Palm Beach Rental Pros",
          description:
            "Seasonal and annual rentals, plus homes for sale, in Palm Beach County, FL.",
          telephone: "+1-561-255-7285",
          url: "https://palmbeachrentalpros.com/",
          areaServed: "Palm Beach County, FL",
          employee: {
            "@type": "Person",
            name: "Paul Schafranick",
            telephone: "+1-561-255-7285",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Palm Beach Rental Pros",
          url: "https://palmbeachrentalpros.com/",
        }),
      },
    ],
  }),
  component: Index,
});


const AGENT_NAME = "Paul Schafranick";
const AGENT_PHONE_DISPLAY = "561-255-7285";
const AGENT_PHONE_TEL = "+15612557285";

const AGENT_FIRST_NAME = "Paul";
const AGENT_PHONE_FORMATTED = "(561) 255-7285";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main>
      {/* Brokerage line (required for IDX / FL advertising) */}
      <div className="w-full bg-navy border-b border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
          VantaSure Realty
        </p>
      </div>

      {/* Top Brand Bar — sole identifier, no nav */}
      <div className="w-full border-b border-gold/20 bg-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-gold" />
            <span className="font-display text-lg sm:text-xl font-semibold tracking-wide">
              Palm Beach <span className="text-gold">Rental</span> Pros
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm">
            <span className="text-foreground/80 font-medium">{AGENT_NAME}</span>
            <a
              href={`tel:${AGENT_PHONE_TEL}`}
              className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              {AGENT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Hero: rentals first */}
      <section className="relative flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-4">
                <Key className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Seasonal &amp; Annual Rentals
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] mb-4">
                Palm Beach County
                <br />
                <span className="text-gold">Rentals</span>
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 max-w-lg mb-6 leading-relaxed">
                Homes, condos and apartments for rent, seasonal or annual, from
                the coast to the western communities of Palm Beach County. Working
                with a local agent who picks up the phone.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a
                  href={`tel:${AGENT_PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                >
                  <Phone className="h-4 w-4" />
                  Call {AGENT_FIRST_NAME} {AGENT_PHONE_FORMATTED}
                </a>
                <a
                  href={`sms:${AGENT_PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
                >
                  <MessageSquare className="h-4 w-4" />
              Text {AGENT_PHONE_FORMATTED}
                </a>
                <a
                  href="#search"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
                >
                  <Search className="h-4 w-4" />
                  Search Rentals
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Search: defaults to Rentals, with a For Sale option */}
            <div id="search" className="animate-fade-in-up scroll-mt-4" style={{ animationDelay: "0.2s" }}>
              <SearchBox initialMode="rent" />
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="py-8 sm:py-10 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Rentals by <span className="text-gold">Area</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Pick a town to start your rental search.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Jupiter", "Palm Beach Gardens", "West Palm Beach", "Boynton Beach", "Delray Beach", "Boca Raton"].map((area) => (
              <Link
                key={area}
                to="/search"
                search={{ mode: "rent", area }}
                className="group rounded-lg border border-gold/15 bg-card p-4 text-center transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="mx-auto mb-2 h-8 w-8 rounded-md bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <span className="font-display text-sm font-semibold text-foreground">{area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
                About {AGENT_NAME}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Your Local <span className="text-gold">Rental</span> Agent
              </h2>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">
                Palm Beach Rental Pros helps renters find seasonal and annual
                rentals across all of Palm Beach County, from Jupiter to
                Boca Raton. {AGENT_NAME} works with you directly, from the
                first search through the lease.
              </p>
              <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                Decided to buy instead? Search homes for sale from the same
                search box, or just call.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Key, label: "Seasonal & annual rentals" },
                  { icon: MapPin, label: "All of Palm Beach County" },
                  { icon: Users, label: "Direct line to Paul" },
                  { icon: Search, label: "Rent or buy search" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section id="management" className="py-8 sm:py-10 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
              Full-Service Solutions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Property <span className="text-gold">Management</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Management services for property owners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Search,
                title: "Tenant Placement",
                desc: "Rigorous screening and vetting to secure qualified, long-term tenants.",
              },
              {
                icon: Shield,
                title: "Asset Protection",
                desc: "Proactive maintenance and compliance to preserve property value.",
              },
              {
                icon: DollarSign,
                title: "Revenue Optimization",
                desc: "Dynamic pricing and lease structuring to maximize rental income.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-gold/15 bg-card p-5 transition-all duration-300 hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <service.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Ready to Find Your <span className="text-gold">Rental</span>?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Tell {AGENT_NAME} what you need, a seasonal stay or an annual
            lease, and he&apos;ll help you find it.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3">
            <a
              href={`tel:${AGENT_PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              <Phone className="h-4 w-4" />
              Call {AGENT_FIRST_NAME} {AGENT_PHONE_FORMATTED}
            </a>
            <a
              href={`sms:${AGENT_PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
            >
              <MessageSquare className="h-4 w-4" />
              Text {AGENT_PHONE_FORMATTED}
            </a>
            <a
              href="mailto:paul@palmbeachrentalpros.com"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
            >
              <Mail className="h-4 w-4" />
              Email Paul
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <span className="text-xs text-muted-foreground">
                    Palm Beach County, FL
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Palm Beach Rental Pros. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Licensed Real Estate Professional in the State of Florida
            </p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}