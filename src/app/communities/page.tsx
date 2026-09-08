import { Suspense } from "react";
import { CommunityCard } from "@/components/cards";
import { SearchMatrix } from "@/components/search-matrix";
import { filterCommunities, type SearchFilters } from "@/lib/data";

function Matrix({ filters }: { filters: SearchFilters }) {
  const rows = filterCommunities(filters);
  return (
    <>
      <SearchMatrix basePath="/communities" />
      <p className="mt-6 text-sm text-mute">{rows.length} communities in this preview set. Prices subject to change.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <CommunityCard key={c.slug} community={c} />
        ))}
      </div>
    </>
  );
}

export default async function CommunitiesPage({ searchParams }: PageProps<"/communities">) {
  const sp = await searchParams;
  const filters: SearchFilters = {
    q: typeof sp.q === "string" ? sp.q : undefined,
    state: typeof sp.state === "string" ? sp.state : undefined,
    kind: typeof sp.kind === "string" ? sp.kind : undefined,
    homeType: typeof sp.homeType === "string" ? sp.homeType : undefined,
    style: typeof sp.style === "string" ? sp.style : undefined,
    price: typeof sp.price === "string" ? sp.price : undefined,
    sqft: typeof sp.sqft === "string" ? sp.sqft : undefined,
    sort: typeof sp.sort === "string" ? sp.sort : undefined,
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Search</p>
      <h1 className="serif mt-2 text-5xl">Communities</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
        Filter this studio catalog by location, price, square footage, and architectural style. It is a curated public-facts set, not the full live map.
      </p>
      <div className="mt-8">
        <Suspense>
          <Matrix filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}
