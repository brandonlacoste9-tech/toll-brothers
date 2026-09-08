import Link from "next/link";
import { Cta } from "@/components/chrome";
import { getCollections } from "@/lib/data";
import { SITE } from "@/lib/site";

export default function DesignStudioPage() {
  const collections = getCollections();
  return (
    <main>
      <section className="relative min-h-[48vh] text-cream">
        <img src="/media/studio.jpg" alt="Design studio materials" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Design Studio</p>
          <h1 className="serif mt-3 max-w-[14ch] text-5xl">Designer Appointed Collections</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="max-w-2xl text-sm leading-relaxed text-slate">
          Expertly curated by design professionals and inspired by model homes. Each look pairs fixtures, finishes, and colors. Available in quick move-in homes, or as a starting point for a build-to-order home.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link key={c.slug} href={`/design-studio/${c.slug}`} className="group overflow-hidden border border-line bg-white">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h2 className="serif text-2xl">{c.name}</h2>
                <p className="mt-2 text-xs tracking-[0.12em] uppercase text-gold">{c.tags}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Cta href={SITE.dac}>See collections on the live site</Cta>
        </div>
      </section>
    </main>
  );
}
