import { Suspense } from "react";
import { HomeCard } from "@/components/cards";
import { SearchMatrix } from "@/components/search-matrix";
import { filterHomes, type SearchFilters } from "@/lib/data";

function Matrix({ filters }: { filters: SearchFilters }) {
  const rows = filterHomes(filters);
  return (
    <>
      <SearchMatrix basePath="/homes" showKind={false} />
      <p className="mt-6 text-sm text-mute">{rows.length} quick move-in homes in this preview set. Prices subject to change.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((h) => (
          <HomeCard key={h.slug} home={h} />
        ))}
      </div>
    </>
  );
}

export default async function HomesPage({ searchParams }: PageProps<"/homes">) {
  const sp = await searchParams;
  const filters: SearchFilters = {
    q: typeof sp.q === "string" ? sp.q : undefined,
    state: typeof sp.state === "string" ? sp.state : undefined,
    style: typeof sp.style === "string" ? sp.style : undefined,
    price: typeof sp.price === "string" ? sp.price : undefined,
    sqft: typeof sp.sqft === "string" ? sp.sqft : undefined,
    sort: typeof sp.sort === "string" ? sp.sort : undefined,
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Inventory</p>
      <h1 className="serif mt-2 text-5xl">Quick move-in homes</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
        New homes already under construction. Move-in ready homes have Designer Appointed selections. Design-ready homes still allow limited personalization, as printed.
      </p>
      <div className="mt-8">
        <Suspense>
          <Matrix filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}
