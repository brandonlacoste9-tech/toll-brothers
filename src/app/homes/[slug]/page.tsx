import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/chrome";
import { ElevationPicker } from "@/components/elevation-picker";
import { FloorPlan } from "@/components/floor-plan";
import { InquiryForm } from "@/components/inquiry-form";
import { getCommunity, getHome, getHomes, getPlan } from "@/lib/data";
import { moneyExact } from "@/lib/site";

export function generateStaticParams() {
  return getHomes().map((h) => ({ slug: h.slug }));
}

export default async function HomeDetailPage({ params }: PageProps<"/homes/[slug]">) {
  const { slug } = await params;
  const home = getHome(slug);
  if (!home) notFound();
  const community = getCommunity(home.communitySlug);
  const plan = home.planSlug ? getPlan(home.planSlug) : null;
  const elevations = plan?.elevations?.length
    ? plan.elevations
    : [{ name: home.elevation, image: home.image }];

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
          {home.status}
          {community ? ` · ${community.name}` : ""}
        </p>
        <h1 className="serif mt-2 text-5xl">{home.name}</h1>
        <p className="mt-3 text-sm text-mute">{home.address}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <ElevationPicker elevations={elevations} alt={home.name} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="grid grid-cols-2 gap-4 border border-line bg-white p-6 sm:grid-cols-3">
            {[
              ["Bedrooms", String(home.beds)],
              ["Baths", String(home.baths)],
              ["Half baths", String(home.halfBaths)],
              ["Garage", String(home.garage)],
              ["Square feet", home.sqft.toLocaleString()],
              ["Stories", String(home.stories)],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] tracking-[0.16em] uppercase text-mute">{k}</p>
                <p className="serif mt-1 text-2xl">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {home.tags.map((t) => (
              <span key={t} className="border border-line px-3 py-1 text-[11px] tracking-[0.14em] uppercase text-slate">
                {t}
              </span>
            ))}
          </div>
          {plan ? (
            <p className="mt-6 text-sm leading-relaxed text-slate">{plan.blurb}</p>
          ) : null}
        </div>
        <aside className="border border-line bg-cream p-6">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Pricing</p>
          <p className="serif mt-2 text-4xl">{moneyExact(home.price)}</p>
          <p className="mt-2 text-sm text-mute">{home.moveDate}. Printed price, subject to change.</p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="flex justify-between border-b border-line pb-2">
              <dt>Base, as printed</dt>
              <dd>{moneyExact(home.price)}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt>Elevation</dt>
              <dd>{home.elevation}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt>Collection</dt>
              <dd>{plan?.collection ?? "See live listing"}</dd>
            </div>
            <div className="flex justify-between text-mute">
              <dt>HOA and options</dt>
              <dd>Not printed here</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-3">
            <Cta href={community?.advisorHref ?? "tel:+14809510782"}>Call {community?.advisorPhone ?? "sales"}</Cta>
            <Cta href={`${home.liveUrl}#appointment`}>Appointment on live site</Cta>
          </div>
        </aside>
      </section>

      {plan ? (
        <section className="mx-auto max-w-7xl px-5 pb-16">
          <h2 className="serif mb-8 text-4xl">Floor plan</h2>
          <FloorPlan rooms={plan.rooms} title={plan.name} />
          <p className="mt-4 text-sm">
            <Link href={`/plans/${plan.slug}`} className="text-gold underline-offset-2 hover:underline">
              Open the full {plan.name} design
            </Link>
          </p>
        </section>
      ) : null}

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <h2 className="serif text-4xl">Route this home to an advisor</h2>
            <p className="mt-4 text-sm text-slate">Uses the printed community sales number. Does not copy the live CRM form.</p>
          </div>
          <InquiryForm homeSlug={home.slug} communitySlug={home.communitySlug} defaultRegion={community?.region} />
        </div>
      </section>
    </main>
  );
}
