"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

export function MobileMenu({
  items
}: {
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/0 text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby={titleId}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute inset-0 bg-black/60"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="absolute right-3 top-3 w-[min(92vw,360px)] rounded-2xl border border-line bg-bg-soft shadow-soft p-4"
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.25 } }}
              exit={{ x: 24, opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between">
                <div id={titleId} className="text-sm font-semibold text-fg">
                  Menu
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/0 text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Close menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M5 5l8 8M13 5l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 grid gap-1">
                {items.map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    {i.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
