"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import { HOME_TYPES, KINDS, PRICE_BANDS, SQFT_BANDS, STATES, STYLES, type SearchFilters } from "@/lib/data";

export function parseFilters(sp: URLSearchParams): SearchFilters {
  return {
    q: sp.get("q") || undefined,
    state: sp.get("state") || undefined,
    kind: sp.get("kind") || undefined,
    homeType: sp.get("homeType") || undefined,
    style: sp.get("style") || undefined,
    price: sp.get("price") || undefined,
    sqft: sp.get("sqft") || undefined,
    sort: sp.get("sort") || undefined,
  };
}

export function SearchMatrix({ basePath, showKind = true }: { basePath: string; showKind?: boolean }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, start] = useTransition();
  const current = useMemo(() => parseFilters(sp), [sp]);

  function set(key: string, value: string) {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    start(() => router.push(`${basePath}?${next.toString()}`));
  }

  const select =
    "h-11 min-w-[8rem] flex-1 border border-line bg-white px-3 text-sm text-ink outline-none focus:border-gold";

  return (
    <div className={`border border-line bg-white p-4 ${pending ? "opacity-70" : ""}`}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Search
          <input
            defaultValue={current.q ?? ""}
            placeholder="Community, city, plan"
            className={select}
            onKeyDown={(e) => {
              if (e.key === "Enter") set("q", (e.target as HTMLInputElement).value);
            }}
            onBlur={(e) => set("q", e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          State
          <select className={select} value={current.state ?? ""} onChange={(e) => set("state", e.target.value)}>
            <option value="">All states</option>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {showKind ? (
          <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
            Community type
            <select className={select} value={current.kind ?? ""} onChange={(e) => set("kind", e.target.value)}>
              <option value="">All types</option>
              {KINDS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Home type
          <select className={select} value={current.homeType ?? ""} onChange={(e) => set("homeType", e.target.value)}>
            <option value="">All homes</option>
            {HOME_TYPES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Price
          <select className={select} value={current.price ?? ""} onChange={(e) => set("price", e.target.value)}>
            <option value="">Any price</option>
            {PRICE_BANDS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Square footage
          <select className={select} value={current.sqft ?? ""} onChange={(e) => set("sqft", e.target.value)}>
            <option value="">Any size</option>
            {SQFT_BANDS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Architectural style
          <select className={select} value={current.style ?? ""} onChange={(e) => set("style", e.target.value)}>
            <option value="">All styles</option>
            {STYLES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-[10px] tracking-[0.16em] uppercase text-mute">
          Sort
          <select className={select} value={current.sort ?? ""} onChange={(e) => set("sort", e.target.value)}>
            <option value="">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="sqft-desc">Largest first</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export function HeroSearch() {
  const router = useRouter();
  return (
    <form
      className="grid w-full max-w-4xl gap-2 bg-paper/95 p-3 shadow-2xl backdrop-blur md:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const next = new URLSearchParams();
        const q = String(fd.get("q") || "");
        const state = String(fd.get("state") || "");
        const price = String(fd.get("price") || "");
        if (q) next.set("q", q);
        if (state) next.set("state", state);
        if (price) next.set("price", price);
        router.push(`/communities?${next.toString()}`);
      }}
    >
      <input name="q" placeholder="City or community" className="h-12 border border-line bg-white px-3 text-sm outline-none focus:border-gold" />
      <select name="state" className="h-12 border border-line bg-white px-3 text-sm outline-none focus:border-gold">
        <option value="">All states</option>
        {STATES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select name="price" className="h-12 border border-line bg-white px-3 text-sm outline-none focus:border-gold">
        <option value="">Any price</option>
        {PRICE_BANDS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <button type="submit" className="h-12 bg-gold text-[11px] tracking-[0.18em] uppercase text-ink">
        Search homes
      </button>
    </form>
  );
}
