"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { InquiryForm } from "./inquiry-form";

const LINKS = [
  { href: "/communities", label: "Communities" },
  { href: "/homes", label: "Quick Move-In" },
  { href: "/plans", label: "Floor Plans" },
  { href: "/design-studio", label: "Design Studio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PreviewBar() {
  return (
    <div className="flex items-center justify-between gap-4 bg-ink px-5 py-2 text-[11px] tracking-[0.12em] text-cream/80 uppercase">
      <span>Preview studio. Not live on tollbrothers.com.</span>
      <a href={SITE.live} target="_blank" rel="noreferrer" className="text-gold underline-offset-2 hover:underline">
        Open the live site
      </a>
    </div>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="serif text-[13px] tracking-[0.32em] text-ink">
            TOLL BROTHERS
          </Link>
          <nav className="hidden items-center gap-6 text-[12px] tracking-[0.14em] uppercase text-slate lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-gold ${path === link.href || path.startsWith(`${link.href}/`) ? "text-gold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTour(true)}
              className="hidden h-11 items-center bg-ink px-5 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-bronze sm:inline-flex"
            >
              Schedule a Tour
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-line lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="grid gap-3 border-t border-line px-5 py-4 lg:hidden">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm tracking-[0.12em] uppercase">
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setTour(true)}
              className="h-12 bg-ink text-[11px] tracking-[0.18em] uppercase text-cream"
            >
              Schedule a Tour
            </button>
          </div>
        ) : null}
      </header>

      {tour ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg border border-line bg-paper p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Private tour</p>
                <h2 className="serif mt-1 text-3xl">Schedule a Tour</h2>
              </div>
              <button type="button" onClick={() => setTour(false)} aria-label="Close" className="grid h-10 w-10 place-items-center border border-line">
                <X size={16} />
              </button>
            </div>
            <InquiryForm compact />
          </div>
        </div>
      ) : null}
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="serif text-sm tracking-[0.28em]">TOLL BROTHERS</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {SITE.tagline} since {SITE.founded}. Fortune 500. {SITE.nyse}.
          </p>
        </div>
        <div className="text-sm text-cream/80">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Headquarters</p>
          <p className="mt-3">
            {SITE.hq}
            <br />
            {SITE.hqCity}
          </p>
          <p className="mt-3 text-cream/60">Sales routing uses printed division phones. This preview does not copy the live form.</p>
        </div>
        <div className="text-sm">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Explore</p>
          <div className="mt-3 grid gap-2 text-cream/80">
            <Link href="/communities" className="hover:text-gold">
              Communities
            </Link>
            <Link href="/homes" className="hover:text-gold">
              Quick Move-In
            </Link>
            <Link href="/design-studio" className="hover:text-gold">
              Design Studio
            </Link>
            <a href={SITE.x} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-gold">
              X <ArrowUpRight size={14} />
            </a>
            <a href={SITE.investors} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-gold">
              Investor Relations <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold">National Open House</p>
          <p className="mt-3 text-sm text-cream/70">{SITE.openHouseWhen}. Step inside to experience the difference, as printed.</p>
          <a
            href={SITE.openHouse}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 items-center bg-gold px-5 text-[11px] tracking-[0.16em] uppercase text-ink"
          >
            RSVP on the live site
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-[11px] tracking-[0.12em] uppercase text-cream/50">
        Preview studio · Not live on tollbrothers.com · Prices subject to change
      </div>
    </footer>
  );
}

export function Cta({
  href,
  children,
  light = false,
  gold = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  gold?: boolean;
}) {
  const cls = gold
    ? "inline-flex h-12 items-center bg-gold px-6 text-[11px] tracking-[0.18em] uppercase text-ink transition hover:bg-bronze hover:text-cream"
    : light
      ? "inline-flex h-12 items-center border border-cream/50 px-6 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-cream hover:text-ink"
      : "inline-flex h-12 items-center bg-ink px-6 text-[11px] tracking-[0.18em] uppercase text-cream transition hover:bg-bronze";
  if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
