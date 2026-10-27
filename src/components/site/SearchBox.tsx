import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AREAS, type RentalTerm, type SearchMode } from "@/lib/listings";

const fieldClass =
  "w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors";

export function SearchBox({ initialMode = "rent" }: { initialMode?: SearchMode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SearchMode>(initialMode);
  const [area, setArea] = useState("");
  const [term, setTerm] = useState<RentalTerm>("any");
  const [beds, setBeds] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(maxPrice.replace(/[^0-9]/g, ""));
    navigate({
      to: "/search",
      search: {
        mode,
        area: area || undefined,
        term: mode === "rent" && term !== "any" ? term : undefined,
        beds: beds ? Number(beds) : undefined,
        maxPrice: price > 0 ? price : undefined,
      },
    });
  };

  const tab = (value: SearchMode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => setMode(value)}
      className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
        mode === value ? "bg-gold text-navy" : "text-foreground/70 hover:text-gold"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl border border-gold/20 bg-card/80 backdrop-blur-sm p-5 sm:p-6 shadow-2xl shadow-black/30">
      <div role="tablist" aria-label="Search type" className="flex gap-1 rounded-lg bg-background/50 p-1 mb-4">
        {tab("rent", "For Rent")}
        {tab("buy", "For Sale")}
      </div>
      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
        {mode === "rent" ? (
          <>
            Search <span className="text-gold">Rentals</span>
          </>
        ) : (
          <>
            Search Homes <span className="text-gold">For Sale</span>
          </>
        )}
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        {mode === "rent"
          ? "Seasonal and annual rentals across Palm Beach County."
          : "Thinking of buying instead? Search homes for sale."}
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label htmlFor="sb-area" className="block text-xs font-medium text-foreground/80 mb-1">
            Area
          </label>
          <select id="sb-area" value={area} onChange={(e) => setArea(e.target.value)} className={fieldClass}>
            <option value="">All of Palm Beach County</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        {mode === "rent" && (
          <div>
            <label htmlFor="sb-term" className="block text-xs font-medium text-foreground/80 mb-1">
              Lease type
            </label>
            <select id="sb-term" value={term} onChange={(e) => setTerm(e.target.value as RentalTerm)} className={fieldClass}>
              <option value="any">Seasonal or annual</option>
              <option value="annual">Annual</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="sb-beds" className="block text-xs font-medium text-foreground/80 mb-1">
              Bedrooms
            </label>
            <select id="sb-beds" value={beds} onChange={(e) => setBeds(e.target.value)} className={fieldClass}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sb-price" className="block text-xs font-medium text-foreground/80 mb-1">
              {mode === "rent" ? "Max monthly rent" : "Max price"}
            </label>
            <input
              id="sb-price"
              type="text"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={mode === "rent" ? "4,000" : "750,000"}
              className={fieldClass}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" />
          {mode === "rent" ? "Search Rentals" : "Search Homes For Sale"}
        </button>
      </form>
    </div>
  );
}
