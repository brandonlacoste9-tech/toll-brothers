import { Cta } from "@/components/chrome";
import { SITE } from "@/lib/site";

export default function AboutPage() {
  return (
    <main>
      <section className="relative min-h-[46vh] text-cream">
        <img src="/media/community-hill.jpg" alt="Master-planned hillside community" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Since 1967</p>
          <h1 className="serif mt-3 max-w-[14ch] text-5xl">America&apos;s luxury home builder</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            ["Fortune 500", SITE.nyse],
            ["60+", "Markets, as printed on the investor site"],
            ["#1", "Most Admired Home Builder, Fortune 2026, ninth year"],
          ].map(([k, v]) => (
            <article key={k} className="border border-line bg-white p-6">
              <p className="serif text-4xl">{k}</p>
              <p className="mt-3 text-sm text-mute">{v}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 max-w-3xl text-sm leading-relaxed text-slate">
          <p>
            Toll Brothers, Inc. is a Fortune 500 company founded by Bob and Bruce Toll in 1967. It became a public company in 1986. Headquarters are printed at {SITE.hq}, {SITE.hqCity}.
          </p>
          <p className="mt-4">{SITE.fortune} The company has also been named Builder of the Year by Builder magazine and is the first two-time recipient of Builder of the Year from Professional Builder magazine.</p>
          <p className="mt-4">
            The printed FAQ states Toll Brothers is a luxury home builder, not by definition a custom builder. This studio preview is not the live site and is not affiliated with a current engagement.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href={SITE.advantage}>Advantage on the live site</Cta>
          <Cta href={SITE.investors}>Investor relations</Cta>
        </div>
      </section>
    </main>
  );
}
