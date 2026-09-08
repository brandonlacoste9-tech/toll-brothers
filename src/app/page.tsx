import { Award, Landmark, Palette, Sparkles } from "lucide-react";
import { Cta } from "@/components/chrome";
import { CommunityCard, HomeCard } from "@/components/cards";
import { HeroMedia } from "@/components/hero-media";
import { HeroSearch } from "@/components/search-matrix";
import { getCommunities, getHomes } from "@/lib/data";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    icon: Landmark,
    title: "Prestigious locations",
    body: "Toll Brothers builds communities in the heart of where you want to live, as printed on the Advantage page.",
  },
  {
    icon: Sparkles,
    title: "Distinctive architecture",
    body: "Form meets function: farmhouses, townhomes, condominiums, and active-adult plans across 60-plus markets.",
  },
  {
    icon: Palette,
    title: "Unrivaled choice",
    body: "Premium products, appliances, fixtures, and nine Designer Appointed Collections as a starting point.",
  },
  {
    icon: Award,
    title: "Customer experience",
    body: "Sales, production, and customer care from first conversation through closing walkthrough.",
  },
];

export default function HomePage() {
  const featured = getCommunities().slice(0, 6);
  const qmi = getHomes().slice(0, 3);

  return (
    <main>
      <section className="relative min-h-[90vh] overflow-hidden text-cream">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">Since 1967 · {SITE.nyse} · Fortune 500</p>
          <h1 className="serif mt-4 max-w-[14ch] text-5xl leading-[0.95] md:text-7xl">Your new home starts here</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80">
            Master-planned communities, quick move-in inventory, and Designer Appointed Collections. Prices on this preview are printed figures and are subject to change.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-sm">
          <p>
            <span className="tracking-[0.16em] uppercase text-gold">National Open House</span>
            <span className="ml-3">{SITE.openHouseWhen}</span>
          </p>
          <Cta href={SITE.openHouse} gold>
            RSVP on the live site
          </Cta>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">The Toll Brothers Advantage</p>
        <h2 className="serif mt-3 max-w-[16ch] text-4xl md:text-5xl">Love everything about home</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((item) => (
            <article key={item.title} className="border border-line bg-white p-6">
              <item.icon className="text-gold" size={22} />
              <h3 className="serif mt-4 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Communities</p>
            <h2 className="serif mt-2 text-4xl">A national map, a local address</h2>
          </div>
          <Cta href="/communities">View all communities</Cta>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-cream">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Quick Move-In</p>
              <h2 className="serif mt-2 text-4xl">Homes already under construction</h2>
            </div>
            <Cta href="/homes" light>
              Browse inventory
            </Cta>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {qmi.map((h) => (
              <HomeCard key={h.slug} home={h} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2">
        <img src="/media/studio.jpg" alt="Design studio materials" className="h-full min-h-[22rem] w-full object-cover" />
        <div className="flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Designer Appointed Collections</p>
          <h2 className="serif mt-3 text-4xl">Designed for living, styled for life</h2>
          <p className="mt-5 text-sm leading-relaxed text-slate">
            Nine printed collections of fixtures, finishes, and colors. Available in quick move-in homes nationwide, or as a starting point for a build-to-order home.
          </p>
          <div className="mt-8">
            <Cta href="/design-studio">Open the Design Studio</Cta>
          </div>
        </div>
      </section>
    </main>
  );
}
