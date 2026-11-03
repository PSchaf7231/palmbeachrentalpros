import process from "node:process";
import { sparkFilterForMode, type Listing, type SearchParams, type SearchResult } from "./listings";

// Server-only Spark client using the RESO Web API (OData) on
// replication.sparkapi.com — the same endpoint/auth the Hobson site uses
// successfully with this key. The key is never logged or returned.
const BASE = process.env.SPARK_API_BASE || "https://replication.sparkapi.com/Version/3/Reso/OData";
const PAGE_SIZE = 24;
const SELECT = [
  "ListingKey", "ListingId", "ListPrice", "StandardStatus",
  "BedroomsTotal", "BathroomsTotalInteger", "LivingArea",
  "StreetNumber", "StreetName", "StreetSuffix", "UnitNumber", "City", "StateOrProvince", "PostalCode",
  "PublicRemarks", "PropertyType", "PropertySubType",
  "ListAgentFirstName", "ListAgentLastName", "ListOfficeName", "ModificationTimestamp",
].join(",");

type Reso = Record<string, unknown> & { Media?: Array<{ MediaURL?: string; Order?: number }> };
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const numv = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

function toListing(r: Reso): Listing {
  const media = Array.isArray(r.Media) ? [...r.Media].sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0)) : [];
  const urls = media.map((m) => m.MediaURL).filter(Boolean) as string[];
  const street = [r.StreetNumber, r.StreetName, r.StreetSuffix, r.UnitNumber ? `#${r.UnitNumber}` : null]
    .filter(Boolean).join(" ").trim();
  const agent = [r.ListAgentFirstName, r.ListAgentLastName].filter(Boolean).join(" ");
  return {
    id: String(r.ListingKey ?? ""),
    mlsNumber: str(r.ListingId),
    address: street || "Address withheld",
    city: str(r.City) ?? "",
    state: str(r.StateOrProvince),
    zip: str(r.PostalCode),
    price: numv(r.ListPrice) ?? 0,
    beds: numv(r.BedroomsTotal),
    baths: numv(r.BathroomsTotalInteger),
    sqft: numv(r.LivingArea),
    photoUrl: urls[0],
    photos: urls,
    remarks: str(r.PublicRemarks),
    listingBrokerage: str(r.ListOfficeName),
    listingAgent: agent || undefined,
  };
}

async function sparkGet(query: string): Promise<{ value?: Reso[] } | null> {
  const key = process.env.SPARK_API_TOKEN || process.env.SPARK_API_KEY;
  if (!key) {
    console.error("[spark] no SPARK_API_TOKEN / SPARK_API_KEY set");
    return null;
  }
  try {
    const res = await fetch(`${BASE}/Property?${query}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    if (!res.ok) {
      const body = (await res.text().catch(() => "")).slice(0, 500);
      console.error(`[spark] request failed: HTTP ${res.status} ${body}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error(`[spark] request failed: network error ${(e as Error)?.message ?? ""}`);
    return null;
  }
}

const enc = encodeURIComponent;

export async function sparkSearch(p: SearchParams & { page?: number }): Promise<SearchResult> {
  const f = ["StandardStatus eq 'Active'", sparkFilterForMode(p.mode)];
  f.push("CountyOrParish eq 'Palm Beach'");
  if (p.area) f.push(`City eq ${q(p.area)}`);
  const minBeds = p.minBeds ?? p.beds;
  if (minBeds) f.push(`BedroomsTotal ge ${Math.floor(minBeds)}`);
  if (p.maxBeds) f.push(`BedroomsTotal le ${Math.floor(p.maxBeds)}`);
  if (p.minBaths) f.push(`BathroomsTotalInteger ge ${Math.floor(p.minBaths)}`);
  if (p.maxBaths) f.push(`BathroomsTotalInteger le ${Math.floor(p.maxBaths)}`);
  if (p.minPrice) f.push(`ListPrice ge ${Math.floor(p.minPrice)}`);
  if (p.maxPrice) f.push(`ListPrice le ${Math.floor(p.maxPrice)}`);
  const skip = ((p.page ?? 1) - 1) * PAGE_SIZE;
  const json = await sparkGet(
    `$top=${PAGE_SIZE}&$skip=${skip}&$filter=${enc(f.join(" and "))}&$select=${enc(SELECT)}` +
      `&$expand=Media&$orderby=${enc("ModificationTimestamp desc,ListingKey desc")}`,
  );
  if (!json) return { status: "unavailable", listings: [] };
  return { status: "ok", listings: (json.value ?? []).map(toListing).filter((l) => l.id) };
}

export async function sparkListing(id: string): Promise<Listing | null> {
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id)) return null;
  const json = await sparkGet(`$top=1&$filter=${enc(`ListingKey eq ${q(id)}`)}&$select=${enc(SELECT)}&$expand=Media`);
  const row = json?.value?.[0];
  return row ? toListing(row) : null;
}

/** Lightweight active inventory used by the dynamic listing sitemap. */
export async function sparkSitemapListings(limit = 5000): Promise<Listing[] | null> {
  const filter = enc(["StandardStatus eq 'Active'", "CountyOrParish eq 'Palm Beach'", "PropertyType ne 'Commercial Lease'"].join(" and "));
  const select = enc(["ListingKey", "ListingId", "ListPrice", "StreetNumber", "StreetName", "StreetSuffix", "UnitNumber", "City", "StateOrProvince", "PostalCode", "PropertyType", "ModificationTimestamp", "ListOfficeName"].join(","));
  const key = process.env.SPARK_API_TOKEN || process.env.SPARK_API_KEY;
  if (!key) return null;
  let url: string | null = `${BASE}/Property?$top=200&$filter=${filter}&$select=${select}&$orderby=${enc("ModificationTimestamp desc,ListingKey desc")}`;
  const rows: Reso[] = [];
  try {
    while (url && rows.length < limit) {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}`, Accept: "application/json" } });
      if (!res.ok) return null;
      const data = await res.json() as { value?: Reso[]; "@odata.nextLink"?: string };
      rows.push(...(data.value ?? []));
      url = data["@odata.nextLink"] ?? null;
    }
    return rows.slice(0, limit).map(toListing).filter((listing) => listing.id);
  } catch {
    return null;
  }
}
