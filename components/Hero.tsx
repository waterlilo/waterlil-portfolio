"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="pt-10 md:pt-16">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="min-h-[72vh] md:min-h-[78vh] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-xs tracking-[0.18em] uppercase text-fg-dim"
          >
            {site.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 text-[44px] leading-[1.02] md:text-[72px] md:leading-[1.02] font-semibold text-fg"
          >
            {site.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-2xl text-base md:text-lg text-fg-dim"
          >
            {site.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-fg hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Send email"
            >
              DM me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white/0 px-5 py-3 text-sm font-medium text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="View work"
            >
              View work
            </a>
          </motion.div>

          <div className="mt-16">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 text-sm text-fg-dim hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              aria-label="Scroll down to projects"
            >
              <span>Scroll down</span>
              <span className="text-fg-dim/80">to see projects</span>
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2.5v8M3.5 7.8 7 10.9l3.5-3.1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
