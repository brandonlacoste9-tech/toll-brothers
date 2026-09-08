import { COMMUNITIES, HOMES, PLANS, COLLECTIONS, type Community, type Home, type Plan } from "./seed";

export type SearchFilters = {
  q?: string;
  state?: string;
  kind?: string;
  homeType?: string;
  style?: string;
  price?: string;
  sqft?: string;
  sort?: string;
};

export function getCommunities() {
  return COMMUNITIES;
}

export function getCommunity(slug: string) {
  return COMMUNITIES.find((c) => c.slug === slug) ?? null;
}

export function getPlans(communitySlug?: string) {
  return communitySlug ? PLANS.filter((p) => p.communitySlug === communitySlug) : PLANS;
}

export function getPlan(slug: string) {
  return PLANS.find((p) => p.slug === slug) ?? null;
}

export function getHomes(communitySlug?: string) {
  return communitySlug ? HOMES.filter((h) => h.communitySlug === communitySlug) : HOMES;
}

export function getHome(slug: string) {
  return HOMES.find((h) => h.slug === slug) ?? null;
}

export function getCollections() {
  return COLLECTIONS;
}

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

export const STATES = [...new Set(COMMUNITIES.map((c) => c.state))].sort();
export const KINDS = [...new Set(COMMUNITIES.map((c) => c.kind))];
export const HOME_TYPES = [...new Set(COMMUNITIES.map((c) => c.homeType))];
export const STYLES = [...new Set([...COMMUNITIES.map((c) => c.style), ...HOMES.map((h) => h.style), ...PLANS.map((p) => p.style)])];

export const PRICE_BANDS = [
  { id: "under-1", label: "Under $1M", min: 0, max: 999_999 },
  { id: "1-2", label: "$1M to $2M", min: 1_000_000, max: 1_999_999 },
  { id: "2-3", label: "$2M to $3M", min: 2_000_000, max: 2_999_999 },
  { id: "3-plus", label: "$3M+", min: 3_000_000, max: 99_000_000 },
];

export const SQFT_BANDS = [
  { id: "under-3", label: "Under 3,000", min: 0, max: 2999 },
  { id: "3-4", label: "3,000 to 4,000", min: 3000, max: 4000 },
  { id: "4-plus", label: "4,000+", min: 4001, max: 99_000 },
];

function band(id: string | undefined, bands: { id: string; min: number; max: number }[]) {
  return bands.find((b) => b.id === id);
}

function matchesPrice(from: number | null, to: number | null, price?: string) {
  const b = band(price, PRICE_BANDS);
  if (!b) return true;
  const low = from ?? to ?? 0;
  const high = to ?? from ?? 0;
  return low <= b.max && high >= b.min;
}

function matchesSqft(from: number | null, to: number | null, sqft?: string) {
  const b = band(sqft, SQFT_BANDS);
  if (!b) return true;
  const low = from ?? to ?? 0;
  const high = to ?? from ?? 0;
  return low <= b.max && high >= b.min;
}

function textMatch(hay: string, q?: string) {
  if (!q) return true;
  return hay.toLowerCase().includes(q.toLowerCase());
}

export function filterCommunities(f: SearchFilters): Community[] {
  let rows = COMMUNITIES.filter((c) => {
    if (f.state && c.state !== f.state) return false;
    if (f.kind && c.kind !== f.kind) return false;
    if (f.homeType && c.homeType !== f.homeType) return false;
    if (f.style && c.style !== f.style) return false;
    if (!matchesPrice(c.priceFrom, c.priceTo, f.price)) return false;
    if (!matchesSqft(c.sqftFrom, c.sqftTo, f.sqft)) return false;
    if (!textMatch(`${c.name} ${c.city} ${c.state} ${c.blurb}`, f.q)) return false;
    return true;
  });
  if (f.sort === "price-desc") rows = [...rows].sort((a, b) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0));
  else if (f.sort === "price-asc") rows = [...rows].sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
  else rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
  return rows;
}

export function filterHomes(f: SearchFilters): Home[] {
  let rows = HOMES.filter((h) => {
    const c = getCommunity(h.communitySlug);
    if (f.state && c?.state !== f.state) return false;
    if (f.style && h.style !== f.style) return false;
    if (f.kind === "Quick Move-In" && h.status === "Coming Soon") return false;
    if (!matchesPrice(h.price, h.price, f.price)) return false;
    if (!matchesSqft(h.sqft, h.sqft, f.sqft)) return false;
    if (!textMatch(`${h.name} ${h.address} ${h.tags.join(" ")}`, f.q)) return false;
    return true;
  });
  if (f.sort === "price-desc") rows = [...rows].sort((a, b) => b.price - a.price);
  else if (f.sort === "sqft-desc") rows = [...rows].sort((a, b) => b.sqft - a.sqft);
  else rows = [...rows].sort((a, b) => a.price - b.price);
  return rows;
}

export function filterPlans(f: SearchFilters): Plan[] {
  return PLANS.filter((p) => {
    const c = getCommunity(p.communitySlug);
    if (f.state && c?.state !== f.state) return false;
    if (f.style && p.style !== f.style) return false;
    if (!matchesPrice(p.priceFrom, p.priceFrom, f.price)) return false;
    if (!matchesSqft(p.sqft, p.sqft, f.sqft)) return false;
    if (!textMatch(`${p.name} ${p.collection} ${p.blurb}`, f.q)) return false;
    return true;
  });
}
