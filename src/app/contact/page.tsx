import { InquiryForm } from "@/components/inquiry-form";
import { DIVISIONS, SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Contact</p>
      <h1 className="serif mt-2 text-5xl">Talk to a printed office</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
        Select a region so this preview can route you to the printed division phone. Sales questions on the live site use the contact form at tollbrothers.com/contact. This studio does not copy that form, and it does not use investor-relations emails for sales.
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <InquiryForm />
        <div>
          <h2 className="serif text-3xl">Division directory</h2>
          <ul className="mt-6 grid gap-4">
            {DIVISIONS.map((d) => (
              <li key={`${d.region}-${d.office}`} className="flex items-center justify-between border-b border-line pb-3 text-sm">
                <span>
                  {d.region} · {d.office}
                </span>
                <a href={d.href} className="text-gold">
                  {d.phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-mute">
            Corporate: {SITE.hq}, {SITE.hqCity}. Full directory:{" "}
            <a href={SITE.contact} className="text-gold underline-offset-2 hover:underline">
              tollbrothers.com/contact
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
