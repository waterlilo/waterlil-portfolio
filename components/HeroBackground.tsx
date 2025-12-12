"use client";

import { motion } from "framer-motion";

/**
 * Lightweight animated hero background:
 * - layered radial gradients ("blobs") drifting slowly
 * - subtle grain overlay (CSS)
 * - vignette to keep edges darker (premium look)
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-bg" />

      {/* Moving blob A */}
      <motion.div
        className="absolute -inset-[35%] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0) 68%)"
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          rotate: [0, 6, -4, 0]
        }}
        transition={{
          duration: 22,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Moving blob B */}
      <motion.div
        className="absolute -inset-[45%] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(180,210,255,0.14), rgba(255,255,255,0) 70%)"
        }}
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 70, -30, 0],
          rotate: [0, -5, 3, 0]
        }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Moving blob C */}
      <motion.div
        className="absolute -inset-[40%] opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(120,255,210,0.10), rgba(255,255,255,0) 72%)"
        }}
        animate={{
          x: [0, 55, -75, 0],
          y: [0, 55, 20, 0],
          rotate: [0, 4, -6, 0]
        }}
        transition={{
          duration: 32,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Vignette (darkens edges like premium sites) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.82) 100%)"
        }}
      />

      {/* Grain overlay (added via CSS class) */}
      <div className="hero-grain absolute inset-0 opacity-[0.18]" />
    </div>
  );
}
