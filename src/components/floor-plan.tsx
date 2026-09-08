"use client";

import { useState } from "react";
import type { Room } from "@/lib/seed";

export function FloorPlan({ rooms, title }: { rooms: Room[]; title: string }) {
  const [active, setActive] = useState<string | null>(rooms[0]?.id ?? null);
  const current = rooms.find((r) => r.id === active) ?? rooms[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="border border-line bg-cream p-4">
        <p className="mb-3 text-[11px] tracking-[0.18em] uppercase text-gold">{title}</p>
        <svg viewBox="0 0 100 90" className="h-auto w-full" role="img" aria-label={`Interactive floor plan for ${title}`}>
          <rect x="2" y="2" width="96" height="86" fill="#faf7f2" stroke="#1c1916" strokeWidth="0.6" />
          {rooms.map((room) => (
            <g key={room.id}>
              <rect
                className="room-hot cursor-pointer transition"
                data-active={active === room.id}
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={active === room.id ? "color-mix(in srgb, #b08d57 28%, white)" : "#fff"}
                stroke={active === room.id ? "#b08d57" : "#c9c0b3"}
                strokeWidth="0.4"
                onClick={() => setActive(room.id)}
              />
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="2.2"
                fill="#3d3832"
                className="pointer-events-none"
              >
                {room.label}
              </text>
            </g>
          ))}
        </svg>
        <p className="mt-3 text-xs text-mute">Studio diagram from the printed room list. Not an official Toll Brothers CAD file. Select a room.</p>
      </div>
      <aside className="border border-line bg-white p-6">
        <p className="text-[11px] tracking-[0.18em] uppercase text-gold">Selected room</p>
        <h3 className="serif mt-2 text-3xl">{current?.label}</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate">
          Highlighted from the printed {title} description. Personalization options sit on the live Design Your Own Home path, which this preview does not copy.
        </p>
        <ul className="mt-6 grid gap-2">
          {rooms.map((room) => (
            <li key={room.id}>
              <button
                type="button"
                onClick={() => setActive(room.id)}
                className={`w-full border px-3 py-2 text-left text-sm ${active === room.id ? "border-gold bg-cream" : "border-line"}`}
              >
                {room.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
