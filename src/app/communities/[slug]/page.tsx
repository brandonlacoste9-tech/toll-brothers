import { notFound } from "next/navigation";
import { Cta } from "@/components/chrome";
import { HomeCard, PlanCard } from "@/components/cards";
import { InquiryForm } from "@/components/inquiry-form";
import { getCommunities, getCommunity, getHomes, getPlans } from "@/lib/data";
import { moneyExact } from "@/lib/site";

export function generateStaticParams() {
  return getCommunities().map((c) => ({ slug: c.slug }));
}

export default async function CommunityPage({ params }: PageProps<"/communities/[slug]">) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();
  const plans = getPlans(community.slug);
  const homes = getHomes(community.slug);

  return (
    <main>
      <section className="relative min-h-[58vh] text-cream">
        <img src={community.image} alt={community.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
            {community.city}, {community.state} · {community.kind}
          </p>
          <h1 className="serif mt-3 max-w-[16ch] text-5xl md:text-6xl">{community.name}</h1>
          <p className="mt-5 max-w-xl text-cream/80">
            {community.priceFrom ? `From ${moneyExact(community.priceFrom)}` : "See live pricing"}
            {community.priceTo ? `. Select homes to ${moneyExact(community.priceTo)}` : ""}. Prices subject to change.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm leading-relaxed text-slate">{community.blurb}</p>
          <ul className="mt-8 grid gap-3">
            {community.bullets.map((b) => (
              <li key={b} className="border-l-2 border-gold pl-4 text-sm text-slate">
                {b}
              </li>
            ))}
          </ul>
          {community.school ? <p className="mt-6 text-sm text-mute">School district: {community.school}</p> : null}
          {community.address ? <p className="mt-2 text-sm text-mute">Sales center: {community.address}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta href={community.advisorHref}>Call {community.advisorPhone}</Cta>
            <Cta href={`${community.liveUrl}#appointment`}>Tour on the live site</Cta>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {community.gallery.slice(0, 4).map((src) => (
            <img key={src} src={src} alt="" className="h-40 w-full object-cover" />
          ))}
        </div>
      </section>

      {homes.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16">
          <h2 className="serif text-4xl">Quick move-in</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homes.map((h) => (
              <HomeCard key={h.slug} home={h} />
            ))}
          </div>
        </section>
      ) : null}

      {plans.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16">
          <h2 className="serif text-4xl">Home designs</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <PlanCard key={p.slug} plan={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Advisor routing</p>
            <h2 className="serif mt-2 text-4xl">Talk to the printed sales team</h2>
            <p className="mt-4 text-sm text-slate">
              {community.advisorLabel}. {community.advisorPhone}. This preview does not impersonate the live appointment widget.
            </p>
          </div>
          <InquiryForm communitySlug={community.slug} defaultRegion={community.region} />
        </div>
      </section>
    </main>
  );
}
