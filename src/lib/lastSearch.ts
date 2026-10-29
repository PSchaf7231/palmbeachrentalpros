export type LastSearch = Record<string, string | number | undefined> & { mode?: "rent" | "buy" };
const KEY = "pbrp:lastSearch";
export function saveLastSearch(s: LastSearch) {
  try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
}
export function loadLastSearch(): LastSearch | null {
  try { const v = sessionStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
