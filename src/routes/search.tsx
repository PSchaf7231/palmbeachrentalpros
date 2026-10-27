import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { SearchBox } from "@/components/site/SearchBox";
import { getListingsProvider, type SearchMode, type RentalTerm } from "@/lib/listings";

interface SearchSchema {
  mode: SearchMode;
  area?: string;
  term?: RentalTerm;
  beds?: number;
  maxPrice?: number;
}

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchSchema => ({
    mode: s.mode === "buy" ? "buy" : "rent",
    area: typeof s.area === "string" && s.area ? s.area : undefined,
    term: s.term === "annual" || s.term === "seasonal" ? s.term : undefined,
    beds: num(s.beds),
    maxPrice: num(s.maxPrice),
  }),
  head: () => ({
    meta: [
      { title: "Search | Palm Beach Rental Pros" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useSearch();
  const { data, isLoading } = useQuery({
    queryKey: ["listings", params],
    queryFn: () => getListingsProvider().search(params),
  });

  const label = params.mode === "rent" ? "rentals" : "homes for sale";

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="w-full bg-navy border-b border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
          VantaSure Realty
        </p>
      </div>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light mb-6">
          <ArrowLeft className="h-4 w-4" /> Palm Beach Rental Pros
        </Link>
        <div className="grid md:grid-cols-[360px_1fr] gap-8 items-start">
          <SearchBox key={params.mode} initialMode={params.mode} />
          <section>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {params.mode === "rent" ? "Rentals" : "Homes for sale"}
              {params.area ? ` in ${params.area}` : " in Palm Beach County"}
            </h1>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : data && data.listings.length > 0 ? (
              <ul className="space-y-3">
                {data.listings.map((l) => (
                  <li key={l.id} className="rounded-lg border border-gold/15 bg-card p-4 text-sm">
                    <p className="font-semibold">{l.address}, {l.city}</p>
                    <p className="text-muted-foreground">
                      ${l.price.toLocaleString()}
                      {l.beds ? ` · ${l.beds} bd` : ""}
                      {l.baths ? ` · ${l.baths} ba` : ""}
                    </p>
                    {l.listingBrokerage && (
                      <p className="text-[11px] text-muted-foreground mt-1">Listing courtesy of {l.listingBrokerage}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-gold/20 bg-card p-6">
                <h2 className="font-display text-lg font-semibold mb-2">Live {label} search is coming soon</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We&apos;re connecting the MLS feed now. In the meantime, tell Paul what you need and he&apos;ll
                  send you matching {label} directly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:5612557285"
                    className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:bg-gold-light"
                  >
                    <Phone className="h-4 w-4" /> Call Paul (561) 255-7285
                  </a>
                  <a
                    href="mailto:paul@palmbeachrentalpros.com"
                    className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10"
                  >
                    <Mail className="h-4 w-4" /> Email Paul
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
