"use client";

import { useState } from "react";
import type { Elevation } from "@/lib/seed";

export function ElevationPicker({ elevations, alt }: { elevations: Elevation[]; alt: string }) {
  const [i, setI] = useState(0);
  const current = elevations[i] ?? elevations[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden border border-line bg-cream">
        <img src={current.image} alt={`${alt}, ${current.name} elevation`} className="h-full w-full object-cover" />
        <p className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1 text-[11px] tracking-[0.16em] uppercase text-cream">{current.name}</p>
      </div>
      {elevations.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {elevations.map((el, idx) => (
            <button
              key={el.name}
              type="button"
              onClick={() => setI(idx)}
              className={`h-11 px-4 text-[11px] tracking-[0.16em] uppercase ${idx === i ? "bg-ink text-cream" : "border border-line"}`}
            >
              {el.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
