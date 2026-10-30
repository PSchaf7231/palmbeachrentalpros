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
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
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
  photos?: string[];
  mlsNumber?: string;
  state?: string;
  zip?: string;
  sqft?: number;
  remarks?: string;
  /** Required IDX attribution: listing brokerage. */
  listingBrokerage?: string;
  listingAgent?: string;
}

export interface SearchResult {
  status: "ok" | "unavailable";
  listings: Listing[];
}

export interface ListingsProvider {
  search(params: SearchParams): Promise<SearchResult>;
}

/** Areas offered in the search box. All Palm Beach County towns. */
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
    ? "PropertyType eq 'Residential Lease'"
    : "PropertyType ne 'Residential Lease' and PropertyType ne 'Commercial Lease'";
}

const placeholderProvider: ListingsProvider = {
  async search() {
    return { status: "unavailable", listings: [] };
  },
};

// Spark provider: server-side via createServerFn (see api/listings.functions.ts
// and spark.server.ts). Falls back to "unavailable" if the key is missing or
// the API errors.
const sparkProvider: ListingsProvider = {
  async search(p) {
    try {
      const { searchListings } = await import("./api/listings.functions");
      return await searchListings({ data: p });
    } catch {
      return placeholderProvider.search(p);
    }
  },
};

export function getListingsProvider(): ListingsProvider {
  return sparkProvider;
}

export const IDX_DISCLAIMER =
  "Listing information is provided by Beaches MLS for consumers' personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in renting or purchasing. Information is deemed reliable but not guaranteed.";
