import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { saveLastSearch } from "@/lib/lastSearch";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { SearchBox } from "@/components/site/SearchBox";
import { IDX_DISCLAIMER, getListingsProvider, listingSlug, type SearchMode, type RentalTerm } from "@/lib/listings";

interface SearchSchema {
  mode: SearchMode;
  area?: string;
  term?: RentalTerm;
  beds?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
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
    minBeds: num(s.minBeds),
    maxBeds: num(s.maxBeds),
    minBaths: num(s.minBaths),
    maxBaths: num(s.maxBaths),
    minPrice: num(s.minPrice),
    maxPrice: num(s.maxPrice),
    page: num(s.page),
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
  const navigate = useNavigate();
  useEffect(() => saveLastSearch(params), [params]);
  const page = params.page ?? 1;
  const goPage = (n: number) => {
    navigate({ to: "/search", search: { ...params, page: n > 1 ? n : undefined } });
    window.scrollTo({ top: 0 });
  };
  const { data, isLoading } = useQuery({
    queryKey: ["listings", params],
    staleTime: 5 * 60 * 1000,
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
          <SearchBox initialMode={params.mode} initial={params} />
          <section>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {params.mode === "rent" ? "Rentals" : "Homes for sale"}
              {params.area ? ` in ${params.area}` : " in Palm Beach County"}
            </h1>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : data && data.listings.length > 0 ? (
              <>
              <ul className="grid sm:grid-cols-2 gap-4">
                {data.listings.map((l) => (
                  <li key={l.id} className="rounded-lg border border-gold/15 bg-card overflow-hidden text-sm">
                    <Link to="/listings/$slug" params={{ slug: listingSlug(l) }} className="block hover:opacity-90">
                      {l.photoUrl ? (
                        <img src={l.photoUrl} alt={`${l.address}, ${l.city}`} loading="lazy" className="h-44 w-full object-cover" />
                      ) : (
                        <div className="h-44 w-full bg-muted" />
                      )}
                      <div className="p-4">
                        <p className="text-lg font-bold text-gold">
                          ${l.price.toLocaleString()}{params.mode === "rent" ? "/mo" : ""}
                        </p>
                        <p className="font-semibold">{l.address}, {l.city}</p>
                        <p className="text-muted-foreground">
                          {l.beds ? `${l.beds} bd` : ""}
                          {l.baths ? ` · ${l.baths} ba` : ""}
                          {l.mlsNumber ? ` · MLS# ${l.mlsNumber}` : ""}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between text-sm">
                <button type="button" disabled={page <= 1} onClick={() => goPage(page - 1)}
                  className="rounded-md border border-gold/40 px-4 py-2 text-gold disabled:opacity-30">← Previous</button>
                <span className="text-muted-foreground">Page {page}</span>
                <button type="button" disabled={data.listings.length < 24} onClick={() => goPage(page + 1)}
                  className="rounded-md border border-gold/40 px-4 py-2 text-gold disabled:opacity-30">Next →</button>
              </div>
              <p className="mt-6 text-[11px] text-muted-foreground">{IDX_DISCLAIMER}</p>
              </>
            ) : (
              <div className="rounded-xl border border-gold/20 bg-card p-6">
                <h2 className="font-display text-lg font-semibold mb-2">Live {label} search is coming soon</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We&apos;re connecting the MLS feed now. In the meantime, tell Paul what you need and he&apos;ll
                  send you matching {label} directly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+15612557285"
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
