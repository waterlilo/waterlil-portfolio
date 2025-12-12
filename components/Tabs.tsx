"use client";

import { cn } from "@/lib/utils";

export function Tabs<T extends string>({
  items,
  value,
  onChange
}: {
  items: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              active
                ? "border-white/20 bg-white/10 text-fg"
                : "border-line bg-white/0 text-fg-dim hover:bg-white/5 hover:text-fg"
            )}
            aria-pressed={active}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
