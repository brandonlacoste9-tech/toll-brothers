import { Suspense } from "react";
import { PlanCard } from "@/components/cards";
import { SearchMatrix } from "@/components/search-matrix";
import { filterPlans, type SearchFilters } from "@/lib/data";

function Matrix({ filters }: { filters: SearchFilters }) {
  const rows = filterPlans(filters);
  return (
    <>
      <SearchMatrix basePath="/plans" showKind={false} />
      <p className="mt-6 text-sm text-mute">{rows.length} floor plans in this preview set. Starting prices subject to change.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((p) => (
          <PlanCard key={p.slug} plan={p} />
        ))}
      </div>
    </>
  );
}

export default async function PlansPage({ searchParams }: PageProps<"/plans">) {
  const sp = await searchParams;
  const filters: SearchFilters = {
    q: typeof sp.q === "string" ? sp.q : undefined,
    state: typeof sp.state === "string" ? sp.state : undefined,
    style: typeof sp.style === "string" ? sp.style : undefined,
    price: typeof sp.price === "string" ? sp.price : undefined,
    sqft: typeof sp.sqft === "string" ? sp.sqft : undefined,
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Build to order</p>
      <h1 className="serif mt-2 text-5xl">Floor plans</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
        Printed home designs with elevation options. Toll Brothers notes it is not, by definition, a custom builder. Plans can be personalized on the live site.
      </p>
      <div className="mt-8">
        <Suspense>
          <Matrix filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}
