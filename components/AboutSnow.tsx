"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Flake = {
  id: number;
  left: number;      // vw
  size: number;      // px
  opacity: number;   // 0.07..0.2
  duration: number;  // seconds
  delay: number;     // seconds
  drift: number;     // vw
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function AboutSnow({
  count = 14,
}: {
  /** редкий снег: 10–18 обычно идеально */
  count?: number;
}) {
  const flakes = useMemo<Flake[]>(() => {
    const rnd = mulberry32(1337);
    return Array.from({ length: count }).map((_, i) => {
      const left = rnd() * 100;                 // 0..100vw
      const size = 2.2 + rnd() * 3.6;           // 1.5..4.1px
      const opacity = 0.10 + rnd() * 0.18;      // 0.05..0.17
      const duration = 14 + rnd() * 16;         // 14..30s
      const delay = rnd() * 10;                 // 0..10s
      const drift = (rnd() - 0.5) * 14;         // -7..7vw
      return { id: i, left, size, opacity, duration, delay, drift };
    });
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <motion.span
          key={f.id}
          className="absolute top-[-8%] rounded-full bg-white"
          style={{
            left: `${f.left}vw`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            filter: "blur(0.4px)",
            willChange: "transform, opacity",
          }}
          initial={{ y: "-10%", x: "0vw" }}
          animate={{ y: "120%", x: `${f.drift}vw` }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}

      {/* очень лёгкая “дымка” снизу, чтобы снег был мягче (можно убрать) */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white/5 to-transparent" />
    </div>
  );
}
