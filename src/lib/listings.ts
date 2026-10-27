/**
 * Listing search contract for palmbeachrentalpros.com.
 *
 * The search UI and /search route only talk to `ListingsProvider`. Today the
 * only provider is a placeholder that returns no data. When the Spark API key
 * is available, implement `sparkProvider` below (server-side only; never expose
 * the key to the browser) and switch `getListingsProvider()` over to it.
 *
 * One BeachesMLS key covers both rentals and sales; the only difference is the
 * filter we send, chosen from `mode` here in our own code.
 */

export type SearchMode = "rent" | "buy";

export type RentalTerm = "any" | "annual" | "seasonal";

export interface SearchParams {
  mode: SearchMode;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  /** Only meaningful when mode === "rent". */
  term?: RentalTerm;
}

export interface Listing {
  id: string;
  address: string;
  city: string;
  price: number;
  beds?: number;
  baths?: number;
  photoUrl?: string;
  /** Required IDX attribution: listing brokerage. */
  listingBrokerage?: string;
}

export interface SearchResult {
  status: "ok" | "unavailable";
  listings: Listing[];
}

export interface ListingsProvider {
  search(params: SearchParams): Promise<SearchResult>;
}

/** Areas offered in the search box. Delray–Boca first. */
export const AREAS = [
  "Delray Beach",
  "Boca Raton",
  "Boynton Beach",
  "Highland Beach",
  "Deerfield Beach",
  "Jupiter",
  "Palm Beach Gardens",
  "Palm Beach",
  "West Palm Beach",
] as const;

/**
 * Where the rentals-vs-sales split lives. TODO(spark): confirm exact
 * PropertyType values for BeachesMLS before wiring (rentals are typically
 * "Residential Lease"; sales "Residential" / "Condo/Co-op").
 */
export function sparkFilterForMode(mode: SearchMode): string {
  return mode === "rent"
    ? "PropertyType Eq 'Residential Lease'"
    : "PropertyType Ne 'Residential Lease'";
}

const placeholderProvider: ListingsProvider = {
  async search() {
    return { status: "unavailable", listings: [] };
  },
};

// TODO(spark): const sparkProvider: ListingsProvider = { async search(p) { ... } }
// implemented in a createServerFn using process.env.SPARK_API_KEY and sparkFilterForMode().

export function getListingsProvider(): ListingsProvider {
  return placeholderProvider;
}
