import { notFound } from "next/navigation";
import { Cta } from "@/components/chrome";
import { InquiryForm } from "@/components/inquiry-form";
import { getCollection, getCollections } from "@/lib/data";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: PageProps<"/design-studio/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <main>
      <section className="relative min-h-[52vh] text-cream">
        <img src={collection.image} alt={collection.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Designer Appointed</p>
          <h1 className="serif mt-3 text-5xl">{collection.name}</h1>
          <p className="mt-4 text-sm tracking-[0.12em] uppercase text-cream/80">{collection.tags}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm leading-relaxed text-slate">{collection.blurb}</p>
          <p className="mt-4 text-sm text-mute">
            Swatches below are studio tones for this preview, not official product SKUs. Structural upgrades and exterior options are selected with a sales consultant on the live site.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {collection.finishes.map((f) => (
              <div key={f.label} className="border border-line bg-white p-3">
                <div className="h-16 w-full" style={{ background: f.tone }} />
                <p className="mt-2 text-xs tracking-[0.12em] uppercase text-mute">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Cta href={SITE.dac}>Open live collections</Cta>
          </div>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
