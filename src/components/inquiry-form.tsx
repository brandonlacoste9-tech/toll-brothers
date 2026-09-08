"use client";

import { useState, type FormEvent } from "react";
import { DIVISIONS } from "@/lib/site";

const INTERESTS = [
  "Schedule an in-person tour",
  "Quick move-in home",
  "Build to order",
  "Designer Appointed Collections",
  "National Open House",
];

const REGIONS = [...new Set(DIVISIONS.map((d) => d.region))];

export function InquiryForm({
  compact = false,
  communitySlug,
  homeSlug,
  defaultRegion,
}: {
  compact?: boolean;
  communitySlug?: string;
  homeSlug?: string;
  defaultRegion?: string;
}) {
  const [sent, setSent] = useState<{ phone: string; phoneHref: string; label: string; liveUrl: string } | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const region = String(fd.get("region") || "");
    const interest = String(fd.get("interest") || "");
    const message = String(fd.get("message") || "").trim();
    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setPending(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, region, interest, message, communitySlug, homeSlug }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not route this inquiry.");
        return;
      }
      setSent(json.route);
    } catch {
      setError("Could not route this inquiry.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-line bg-cream px-5 py-6 text-sm leading-relaxed text-slate">
        <p>
          This preview does not copy the live Toll Brothers form. Your note is routed to the printed{" "}
          <strong>{sent.label}</strong>.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={sent.phoneHref} className="inline-flex h-11 items-center bg-ink px-4 text-[11px] tracking-[0.16em] uppercase text-cream">
            Call {sent.phone}
          </a>
          <a
            href={sent.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center border border-line px-4 text-[11px] tracking-[0.16em] uppercase"
          >
            Book on the live site
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        Name
        <input name="name" required autoComplete="name" className="h-12 border border-line bg-white px-3 text-sm tracking-normal text-ink outline-none focus:border-gold" />
      </label>
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        Email
        <input name="email" type="email" required autoComplete="email" className="h-12 border border-line bg-white px-3 text-sm tracking-normal text-ink outline-none focus:border-gold" />
      </label>
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        Phone
        <input name="phone" type="tel" autoComplete="tel" className="h-12 border border-line bg-white px-3 text-sm tracking-normal text-ink outline-none focus:border-gold" />
      </label>
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        Region
        <select name="region" defaultValue={defaultRegion ?? REGIONS[0]} className="h-12 border border-line bg-white px-3 text-sm tracking-normal text-ink outline-none focus:border-gold">
          {REGIONS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        I am interested in
        <select name="interest" defaultValue={INTERESTS[0]} className="h-12 border border-line bg-white px-3 text-sm tracking-normal text-ink outline-none focus:border-gold">
          {INTERESTS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-xs tracking-[0.16em] uppercase text-mute">
        Message
        <textarea name="message" rows={compact ? 3 : 5} className="border border-line bg-white px-3 py-3 text-sm tracking-normal text-ink outline-none focus:border-gold" />
      </label>
      {error ? <p className="text-sm text-bronze">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center bg-ink px-6 text-xs tracking-[0.18em] uppercase text-cream transition hover:bg-bronze disabled:opacity-60"
      >
        {pending ? "Routing..." : "Route to an advisor"}
      </button>
    </form>
  );
}
