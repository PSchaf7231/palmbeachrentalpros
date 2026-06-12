import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Building2,
  Star,
  ChevronRight,
  ArrowRight,
  Shield,
  Key,
  Clock,
  Users,
  Search,
  DollarSign,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palm Beach Real Estate Pros | Luxury Rentals" },
      {
        name: "description",
        content:
          "Discover luxury residential rentals in Palm Beach County. Waterfront estates, golf communities, and premier high-rise living. Specializing in Boca Bridges, Seven Bridges, Vista Blue, and more.",
      },
      {
        property: "og:title",
        content: "Palm Beach Real Estate Pros | Luxury Rentals",
      },
      {
        property: "og:description",
        content:
          "Discover luxury residential rentals in Palm Beach County. Waterfront estates, golf communities, and premier high-rise living.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const communities = [
  { name: "Two City Plaza", type: "High-Rise" },
  { name: "Water Club", type: "Waterfront" },
  { name: "Alton", type: "Town Center" },
  { name: "Vista Blue", type: "Golf Community" },
  { name: "Seven Bridges", type: "Golf Community" },
  { name: "Boca Bridges", type: "Golf Community" },
  { name: "The Bristol", type: "Luxury High-Rise" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Listings", href: "#listings" },
  { label: "Communities", href: "#communities" },
  { label: "About", href: "#about" },
  { label: "Property Management", href: "#management" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    moveIn: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", phone: "", email: "", budget: "", moveIn: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="flex items-center gap-2"
            >
              <Building2 className="h-7 w-7 text-gold" />
              <span className="font-display text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                Palm Beach <span className="text-gold">Real Estate</span> Pros
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors duration-200 tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                <Phone className="h-4 w-4" />
                Get Started
              </a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gold hover:text-gold-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-light border-b border-gold/20 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="block text-base font-medium text-foreground/80 hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy w-full justify-center mt-4"
              >
                <Phone className="h-4 w-4" />
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-6">
                <Star className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Palm Beach County&apos;s Elite Rental Specialists
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6">
                Luxury Living
                <br />
                <span className="text-gold">Redefined</span> in Palm Beach
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 max-w-lg mb-8 leading-relaxed">
                Exclusive access to the finest waterfront estates, golf
                communities, and premier high-rise residences. Your dream home
                awaits in Boca Raton, Delray Beach, and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#listings"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#listings");
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                >
                  <Search className="h-4 w-4" />
                  Browse Listings
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4" />
                  Speak with an Agent
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-navy bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center text-xs font-bold text-gold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">500+ Happy Clients</p>
                  <p className="text-xs text-foreground/50">Trusted across Palm Beach County</p>
                </div>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-xl border border-gold/20 bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl shadow-black/30">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Find Your <span className="text-gold">Dream Home</span>
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Tell us what you&apos;re looking for and our specialists will
                  curate listings just for you.
                </p>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto h-14 w-14 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                      <Star className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      Request Received!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A luxury specialist will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-md border border-gold/20 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full rounded-md border border-gold/20 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="(561) 555-0123"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-md border border-gold/20 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                          Monthly Budget
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                            className="w-full rounded-md border border-gold/20 bg-background/50 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                            placeholder="5,000+"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                          Move-in Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="date"
                            required
                            value={formData.moveIn}
                            onChange={(e) =>
                              setFormData({ ...formData, moveIn: e.target.value })
                            }
                            className="w-full rounded-md border border-gold/20 bg-background/50 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Get Personalized Listings
                    </button>
                    <p className="text-xs text-center text-muted-foreground">
                      Your information is secure. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDX Embed Placeholder */}
      <section id="listings" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Featured <span className="text-gold">Listings</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our curated selection of luxury rentals, updated in real-time.
            </p>
          </div>
          <div className="rounded-xl border border-gold/30 bg-card p-1 shadow-lg shadow-black/20">
            <div className="rounded-lg border border-gold/20 bg-navy/50 min-h-[500px] flex items-center justify-center p-8">
              <div
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html:
                    '<!-- BOLDTRAIL FILTERED RENTAL IDX EMBED WIDGET GOES HERE - FILTER SET TO RESIDENTIAL RENTALS $2,500+ -->',
                }}
              />
              <div className="absolute text-center">
                <Search className="h-12 w-12 text-gold/40 mx-auto mb-4" />
                <p className="text-lg font-display font-semibold text-foreground/60 mb-2">
                  IDX Widget Placeholder
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  BoldTrail filtered rental IDX embed will render here.
                  Filter preset: Residential Rentals $2,500+.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section id="communities" className="py-16 sm:py-20 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 block">
              Neighborhood Expertise
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Communities We <span className="text-gold">Serve</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Deep local knowledge of Palm Beach County&apos;s most prestigious
              residential communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {communities.map((community, i) => (
              <div
                key={community.name}
                className="group relative rounded-lg border border-gold/15 bg-card p-6 transition-all duration-300 hover:border-gold/40 hover:bg-card/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-md bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Home className="h-5 w-5 text-gold" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {community.name}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {community.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gold/20">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Luxury waterfront estate in Palm Beach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:right-8 rounded-xl border border-gold/20 bg-card p-6 shadow-xl shadow-black/30 max-w-[260px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold text-foreground">15+</p>
                    <p className="text-xs text-muted-foreground">Years Experience</p>
                  </div>
                </div>
                <div className="h-px bg-gold/10 mb-3" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground">Clients Served</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 block">
                About Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Your Trusted Partner in <span className="text-gold">Luxury Rentals</span>
              </h2>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                Palm Beach Real Estate Pros is a boutique luxury rental
                consultancy specializing in the most sought-after residential
                communities across Palm Beach County. From waterfront estates in
                Boca Raton to premier high-rise living in West Palm Beach, we
                connect discerning clients with exceptional properties.
              </p>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Our white-glove service includes personalized property tours,
                lease negotiation, and ongoing tenant advocacy. We understand
                that finding the right home is about more than square footage —
                it&apos;s about lifestyle, community, and peace of mind.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Licensed & Insured" },
                  { icon: Key, label: "Exclusive Access" },
                  { icon: Clock, label: "24/7 Support" },
                  { icon: MapPin, label: "Local Experts" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">
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
      <section id="management" className="py-16 sm:py-20 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 block">
              Full-Service Solutions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Property <span className="text-gold">Management</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive management services for property owners seeking
              maximum return and minimal hassle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Tenant Placement",
                desc: "Rigorous screening and vetting to secure qualified, long-term tenants for your investment property.",
              },
              {
                icon: Shield,
                title: "Asset Protection",
                desc: "Proactive maintenance, inspections, and compliance management to preserve and enhance property value.",
              },
              {
                icon: DollarSign,
                title: "Revenue Optimization",
                desc: "Dynamic pricing strategies and lease structuring designed to maximize your rental income.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-gold/15 bg-card p-8 transition-all duration-300 hover:border-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5"
              >
                <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to Find Your <span className="text-gold">Perfect Home</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our luxury rental specialists are standing by to help you discover
            the finest properties Palm Beach County has to offer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              <Phone className="h-4 w-4" />
              Call (561) 555-0199
            </a>
            <a
              href="mailto:info@palmbeachrealestatepros.com"
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-3.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gold/10 bg-navy-light/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-gold" />
                <span className="font-display text-lg font-semibold text-foreground">
                  Palm Beach <span className="text-gold">Real Estate</span> Pros
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Palm Beach County&apos;s premier luxury rental specialists. Connecting
                discerning clients with exceptional homes since 2009.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gold/60 hover:text-gold transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gold/60 hover:text-gold transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gold/60 hover:text-gold transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Communities
              </h4>
              <ul className="space-y-2.5">
                {communities.map((c) => (
                  <li key={c.name}>
                    <a
                      href="#communities"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo("#communities");
                      }}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {["Luxury Rentals", "Property Management", "Tenant Placement", "Investment Consulting", "Market Analysis"].map(
                  (s) => (
                    <li key={s}>
                      <span className="text-sm text-muted-foreground">{s}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">(561) 555-0199</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    info@palmbeachrealestatepros.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    150 E Palmetto Park Rd
                    <br />
                    Boca Raton, FL 33432
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Palm Beach Real Estate Pros. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Licensed Real Estate Brokerage in the State of Florida
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
