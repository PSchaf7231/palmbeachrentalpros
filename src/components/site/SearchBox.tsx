import { useEffect, useState } from "react";
import { loadLastSearch, type LastSearch } from "@/lib/lastSearch";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AREAS, type SearchMode } from "@/lib/listings";

const fieldClass =
  "w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors";

export function SearchBox({ initialMode = "rent", initial }: { initialMode?: SearchMode; initial?: LastSearch }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SearchMode>(initialMode);
  const [area, setArea] = useState("");
  const fromSaved = (o: LastSearch | null | undefined) => {
    const g = (k: string) => (o?.[k] != null ? String(o[k]) : "");
    return { minBeds: g("minBeds") || g("beds"), maxBeds: g("maxBeds"), minBaths: g("minBaths"), maxBaths: g("maxBaths"), minPrice: g("minPrice"), maxPrice: g("maxPrice") };
  };
  const [f, setF] = useState(() => fromSaved(initial));
  // Prefill from the URL (search page) or, on the home page, the last search this session.
  useEffect(() => {
    const o = initial ?? loadLastSearch();
    if (!o) return;
    if (o.mode === "rent" || o.mode === "buy") setMode(o.mode);
    setArea(typeof o.area === "string" ? o.area : "");
    setF(fromSaved(o));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initial ?? null)]);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setF((o) => ({ ...o, [k]: e.target.value }));
  const n = (v: string) => {
    const x = Number(v.replace(/[^0-9]/g, ""));
    return x > 0 ? x : undefined;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/search",
      search: {
        mode,
        area: area || undefined,
        minBeds: n(f.minBeds),
        maxBeds: n(f.maxBeds),
        minBaths: n(f.minBaths),
        maxBaths: n(f.maxBaths),
        minPrice: n(f.minPrice),
        maxPrice: n(f.maxPrice),
      },
    });
  };

  const countSel = (k: keyof typeof f, label: string) => (
    <select aria-label={label} value={f[k]} onChange={set(k)} className={fieldClass}>
      <option value="">{label.startsWith("Min") ? "No min" : "No max"}</option>
      {[1, 2, 3, 4, 5, 6].map((x) => (
        <option key={x} value={x}>{x}</option>
      ))}
    </select>
  );
  const prices = mode === "rent"
    ? [1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7500, 10000, 15000, 20000, 30000, 40000, 50000]
    : [100000, 200000, 300000, 400000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000];
  const fmt = (x: number) => (x >= 1e6 ? `$${x / 1e6}M` : x >= 1e4 && mode === "buy" ? `$${x / 1000}k` : `$${x.toLocaleString()}`);
  const priceSel = (k: "minPrice" | "maxPrice", label: string) => (
    <select aria-label={label} value={f[k]} onChange={set(k)} className={fieldClass}>
      <option value="">{k === "minPrice" ? "No min" : "No max"}</option>
      {prices.map((x, i) => (
        <option key={x} value={x}>{fmt(x)}{k === "minPrice" && i === prices.length - 1 ? "+" : ""}</option>
      ))}
    </select>
  );
  const row = (label: string, a: React.ReactNode, b: React.ReactNode) => (
    <div>
      <span className="block text-xs font-medium text-foreground/80 mb-1">{label}</span>
      <div className="grid grid-cols-2 gap-3">{a}{b}</div>
    </div>
  );

  const tab = (value: SearchMode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => { setMode(value); setF((o) => ({ ...o, minPrice: "", maxPrice: "" })); }}
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
        {row("Bedrooms", countSel("minBeds", "Min beds"), countSel("maxBeds", "Max beds"))}
        {row("Bathrooms", countSel("minBaths", "Min baths"), countSel("maxBaths", "Max baths"))}
        {row(
          mode === "rent" ? "Monthly rent" : "Price",
          priceSel("minPrice", "Min price"),
          priceSel("maxPrice", "Max price"),
        )}
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
