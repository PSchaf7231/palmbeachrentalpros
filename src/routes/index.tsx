import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Home,
  Building2,
  Star,
  ArrowRight,
  Shield,
  Key,
  Search,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { LeadCapture } from "@/components/site/LeadCapture";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import {
  AGENT_NAME,
  AGENT_PHONE_TEL,
  BROKERAGE_NAME,
  CALL_LABEL,
  COMMUNITIES as communities,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const PAGE_TITLE = "Palm Beach County Luxury Rentals | Palm Beach Rental Pros";
const PAGE_DESCRIPTION =
  "Search luxury rentals across Palm Beach County: waterfront condos, gated communities and high-rise living. Call Paul (561) 255-7285 or get new-listing alerts.";
const SHORT_DESCRIPTION =
  "Luxury rentals in Palm Beach County: waterfront condos, gated communities and high-rise living. Call Paul (561) 255-7285.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: SHORT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: SITE_NAME },
      // TODO: add og:image / twitter:image once a share image exists in /public.
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: SHORT_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: SITE_NAME,
          description: "Luxury residential rental consultancy serving Palm Beach County.",
          telephone: "+1-561-255-7285",
          url: `${SITE_URL}/`,
          areaServed: "Palm Beach County, FL",
          parentOrganization: { "@type": "Organization", name: BROKERAGE_NAME },
          employee: {
            "@type": "Person",
            name: AGENT_NAME,
            telephone: "+1-561-255-7285",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body pb-20 md:pb-0">
      <main>
        {/* Brokerage line (required for IDX / FL advertising) */}
        <div className="w-full bg-navy border-b border-white/10">
          <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
            {BROKERAGE_NAME}
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
                {CALL_LABEL}
              </a>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
            <div className="animate-fade-in-up max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-4">
                <Star className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Palm Beach County&apos;s Elite Rental Specialists
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
                Luxury Rentals in <span className="text-gold">Palm Beach County</span>
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 max-w-lg mb-6 leading-relaxed">
                Exclusive access to the finest waterfront estates, gated communities, and premier
                high-rise residences.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                >
                  <Search className="h-4 w-4" />
                  Search Rentals
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${AGENT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4" />
                  {CALL_LABEL}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* IDX Embed Placeholder */}
        <section id="listings" className="py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Featured <span className="text-gold">Listings</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Browse our curated selection of luxury rentals, updated in real-time.
              </p>
            </div>
            <div className="rounded-xl border border-gold/30 bg-card p-1 shadow-lg shadow-black/20">
              <div className="relative rounded-lg border border-gold/20 bg-navy/50 min-h-[320px] flex items-center justify-center p-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<!-- BOLDTRAIL FILTERED RENTAL IDX EMBED WIDGET GOES HERE - FILTER SET TO RESIDENTIAL RENTALS $2,500+ -->",
                  }}
                />
                <div className="text-center">
                  <Search className="h-10 w-10 text-gold/40 mx-auto mb-3" />
                  <p className="text-base font-display font-semibold text-foreground/60 mb-1">
                    IDX Widget Placeholder
                  </p>
                  <p className="text-xs text-muted-foreground max-w-md">
                    BoldTrail filtered rental IDX embed will render here. Filter preset: Residential
                    Rentals $2,500+.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voluntary lead capture (no pop-ups, no gating) */}
        <LeadCapture id="request" source="home-search" defaultMode="request" />

        {/* Communities Section */}
        <section id="communities" className="py-8 sm:py-10 bg-navy-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
                Neighborhood Expertise
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Communities We <span className="text-gold">Serve</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Deep local knowledge of Palm Beach County&apos;s most prestigious communities.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {communities.map((community) => (
                <a
                  key={community.name}
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-lg border border-gold/15 bg-card p-4 transition-all duration-300 hover:border-gold/40 hover:bg-card/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="h-8 w-8 rounded-md bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Home className="h-4 w-4 text-gold" />
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-gold/40 group-hover:text-gold transition-all" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-0.5">
                    {community.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                    {community.type}
                  </p>
                  <p className="text-[10px] text-gold/70 font-medium truncate">
                    {community.url.replace("https://", "")}
                  </p>
                </a>
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
                  Your Trusted Partner in <span className="text-gold">Luxury Rentals</span>
                </h2>
                <p className="text-sm text-foreground/70 mb-3 leading-relaxed">
                  Palm Beach Rental Pros is a boutique luxury rental consultancy specializing in the
                  most sought-after residential communities across Palm Beach County. From
                  waterfront estates in Boca Raton to premier high-rise living in West Palm Beach,{" "}
                  {AGENT_NAME}
                  connects discerning clients with exceptional properties.
                </p>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                  White-glove service includes personalized property tours, lease negotiation, and
                  ongoing tenant advocacy.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Key, label: "Exclusive Access" },
                    { icon: MapPin, label: "Local Experts" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-3.5 w-3.5 text-gold" />
                      </div>
                      <span className="text-xs font-medium text-foreground/80">{item.label}</span>
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
                Comprehensive management services for property owners.
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
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Second voluntary lead capture, lower on the page */}
        <LeadCapture id="alerts" source="home-lower" defaultMode="alerts" />

        {/* CTA */}
        <section className="py-8 sm:py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Ready to Find Your <span className="text-gold">Perfect Home</span>?
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
              {AGENT_NAME} is standing by to help you discover the finest properties Palm Beach
              County has to offer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${AGENT_PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                <Phone className="h-4 w-4" />
                {CALL_LABEL}
              </a>
              <a
                href="mailto:paul@palmbeachrentalpros.com"
                className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
              >
                <Mail className="h-4 w-4" />
                Email Paul
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
      <StickyCallBar />
    </div>
  );
}
