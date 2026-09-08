import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/chrome";
import { ElevationPicker } from "@/components/elevation-picker";
import { FloorPlan } from "@/components/floor-plan";
import { InquiryForm } from "@/components/inquiry-form";
import { getCommunity, getPlan, getPlans } from "@/lib/data";
import { moneyExact } from "@/lib/site";

export function generateStaticParams() {
  return getPlans().map((p) => ({ slug: p.slug }));
}

export default async function PlanPage({ params }: PageProps<"/plans/[slug]">) {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) notFound();
  const community = getCommunity(plan.communitySlug);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">{plan.collection}</p>
        <h1 className="serif mt-2 text-5xl">{plan.name}</h1>
        {community ? (
          <p className="mt-3 text-sm">
            <Link href={`/communities/${community.slug}`} className="text-gold underline-offset-2 hover:underline">
              {community.name}
            </Link>
          </p>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <ElevationPicker elevations={plan.elevations} alt={plan.name} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm leading-relaxed text-slate">{plan.blurb}</p>
          <ul className="mt-6 grid gap-3">
            {plan.highlights.map((h) => (
              <li key={h} className="border-l-2 border-gold pl-4 text-sm text-slate">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <aside className="border border-line bg-cream p-6">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Starting price</p>
          <p className="serif mt-2 text-4xl">{plan.priceFrom ? moneyExact(plan.priceFrom) : "See live site"}</p>
          <p className="mt-2 text-sm text-mute">
            {plan.beds} bedrooms · {plan.baths} baths · {plan.sqft.toLocaleString()}+ sf · {plan.stories} {plan.stories === "1" ? "story" : "stories"}
          </p>
          <div className="mt-6 grid gap-3">
            <Cta href={community?.advisorHref ?? "tel:+14809510782"}>Call {community?.advisorPhone ?? "sales"}</Cta>
            <Cta href={`${plan.liveUrl}#appointment`}>Personalize on live site</Cta>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="serif mb-8 text-4xl">Interactive floor plan</h2>
        <FloorPlan rooms={plan.rooms} title={plan.name} />
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <h2 className="serif text-4xl">Ask about this plan</h2>
            <p className="mt-4 text-sm text-slate">Routes to the printed community sales team. Does not copy Design Your Own Home.</p>
          </div>
          <InquiryForm communitySlug={plan.communitySlug} defaultRegion={community?.region} />
        </div>
      </section>
    </main>
  );
}
