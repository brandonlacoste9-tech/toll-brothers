import Link from "next/link";
import type { Community, Home, Plan } from "@/lib/seed";
import { money, moneyExact } from "@/lib/site";

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Link href={`/communities/${community.slug}`} className="group grid overflow-hidden border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(22,20,18,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={community.image} alt={community.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-ink/85 px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-cream">{community.kind}</span>
      </div>
      <div className="grid gap-2 p-5">
        <p className="text-[11px] tracking-[0.16em] uppercase text-gold">
          {community.city}, {community.state}
        </p>
        <h3 className="serif text-2xl leading-tight">{community.name}</h3>
        <p className="text-sm text-mute">{community.homeType}</p>
        <p className="text-sm">
          {community.priceFrom ? `From ${moneyExact(community.priceFrom)}` : "See live pricing"}
          {community.priceTo ? ` to ${money(community.priceTo)}` : ""}
        </p>
      </div>
    </Link>
  );
}

export function HomeCard({ home }: { home: Home }) {
  return (
    <Link href={`/homes/${home.slug}`} className="group grid overflow-hidden border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(22,20,18,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={home.image} alt={home.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-gold px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-ink">{home.status}</span>
      </div>
      <div className="grid gap-2 p-5">
        <h3 className="serif text-2xl leading-tight">{home.name}</h3>
        <p className="text-sm text-mute">{home.address}</p>
        <p className="text-sm">
          {home.beds} bd · {home.baths} ba · {home.sqft.toLocaleString()} sf
        </p>
        <p className="text-sm font-medium">{moneyExact(home.price)}</p>
      </div>
    </Link>
  );
}

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Link href={`/plans/${plan.slug}`} className="group grid overflow-hidden border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(22,20,18,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={plan.image} alt={plan.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-ink/85 px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-cream">{plan.style}</span>
      </div>
      <div className="grid gap-2 p-5">
        <p className="text-[11px] tracking-[0.16em] uppercase text-gold">{plan.collection}</p>
        <h3 className="serif text-2xl leading-tight">{plan.name}</h3>
        <p className="text-sm text-mute">
          {plan.beds} bd · {plan.baths} ba · {plan.sqft.toLocaleString()}+ sf
        </p>
        <p className="text-sm">{plan.priceFrom ? `Starting at ${moneyExact(plan.priceFrom)}` : "See live pricing"}</p>
      </div>
    </Link>
  );
}
