import process from "node:process";
import { sparkFilterForMode, type Listing, type SearchParams, type SearchResult } from "./listings";

// Server-only Spark (FBS) client. The key is read per-request and never logged
// or returned; errors are reduced to a generic status.
const BASE = "https://sparkapi.com/v1/listings";
const SELECT = [
  "ListingKey", "ListingId", "ListPrice", "City", "StateOrProvince", "PostalCode",
  "UnparsedFirstLineAddress", "UnparsedAddress", "BedsTotal", "BathsTotal",
  "BuildingAreaTotal", "ListOfficeName", "ListAgentName", "PublicRemarks",
  "PropertyType", "PropertySubType", "MlsStatus",
].join(",");

type Std = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" && v && !v.startsWith("*") ? v : undefined);
const numv = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const q = (s: string) => `'${s.replace(/'/g, "")}'`;

function toListing(r: { Id?: string; StandardFields?: Std }): Listing {
  const f = r.StandardFields ?? {};
  const photos = (f.Photos as Array<Record<string, string>> | undefined) ?? [];
  const urls = photos.map((p) => p.UriLarge || p.Uri800 || p.Uri640 || p.Uri300).filter(Boolean) as string[];
  return {
    id: String(r.Id ?? f.ListingKey ?? ""),
    mlsNumber: str(f.ListingId),
    address: str(f.UnparsedFirstLineAddress) ?? str(f.UnparsedAddress) ?? "Address withheld",
    city: str(f.City) ?? "",
    state: str(f.StateOrProvince),
    zip: str(f.PostalCode),
    price: numv(f.ListPrice) ?? 0,
    beds: numv(f.BedsTotal),
    baths: numv(f.BathsTotal),
    sqft: numv(f.BuildingAreaTotal),
    photoUrl: urls[0],
    photos: urls,
    remarks: str(f.PublicRemarks),
    listingBrokerage: str(f.ListOfficeName),
    listingAgent: str(f.ListAgentName),
  };
}

async function sparkGet(path: string, qs: Record<string, string>): Promise<{ D?: { Success?: boolean; Results?: unknown[] } } | null> {
  const key = process.env.SPARK_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${BASE}${path}?${new URLSearchParams(qs)}`, {
      headers: {
        Authorization: `Bearer ${key}`,
        "X-SparkApi-User-Agent": "PalmBeachRentalPros",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      console.error(`[spark] request failed: HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch {
    console.error("[spark] request failed: network error");
    return null;
  }
}

export async function sparkSearch(p: SearchParams & { page?: number }): Promise<SearchResult> {
  const parts = [sparkFilterForMode(p.mode), "MlsStatus Eq 'Active'"];
  if (p.area) parts.push(`City Eq ${q(p.area)}`);
  if (p.beds) parts.push(`BedsTotal Ge ${Math.floor(p.beds)}`);
  if (p.minPrice) parts.push(`ListPrice Ge ${Math.floor(p.minPrice)}.0`);
  if (p.maxPrice) parts.push(`ListPrice Le ${Math.floor(p.maxPrice)}.0`);
  const json = await sparkGet("", {
    _filter: parts.join(" And "),
    _select: SELECT,
    _expand: "PrimaryPhoto",
    _limit: "24",
    _page: String(p.page ?? 1),
    _orderby: "-ModificationTimestamp",
  });
  if (!json?.D?.Success) return { status: "unavailable", listings: [] };
  const rows = (json.D.Results ?? []) as Array<{ Id?: string; StandardFields?: Std }>;
  return { status: "ok", listings: rows.map(toListing) };
}

export async function sparkListing(id: string): Promise<Listing | null> {
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id)) return null;
  const json = await sparkGet(`/${id}`, { _expand: "Photos", _select: SELECT });
  const row = json?.D?.Success ? (json.D.Results?.[0] as { Id?: string; StandardFields?: Std } | undefined) : undefined;
  return row ? toListing(row) : null;
}
