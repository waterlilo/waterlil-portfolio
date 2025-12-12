"use client";

import { motion } from "framer-motion";

export function FloatingCross() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Можно сделать 2 крестика разного размера для глубины */}
      <Cross
        className="absolute left-[-10%] top-[20%]"
        size={120}
        delay={0}
        duration={26}
        toX="120vw"
        toY="-12vh"
        opacity={0.14}
      />
      <Cross
        className="absolute left-[-15%] top-[55%]"
        size={78}
        delay={6}
        duration={34}
        toX="115vw"
        toY="8vh"
        opacity={0.09}
      />
    </motion.div>
  );
}

function Cross({
  className,
  size,
  delay,
  duration,
  toX,
  toY,
  opacity,
}: {
  className?: string;
  size: number;
  delay: number;
  duration: number;
  toX: string;
  toY: string;
  opacity: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ x: "0vw", y: "0vh", rotate: -8, opacity: 0 }}
      animate={{
        x: toX,
        y: toY,
        rotate: 10,
        opacity: opacity,
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }}
      style={{ width: size, height: size, filter: "blur(0.2px)" }}
    >
      {/* SVG крестик (стилизованно, “металл”) */}
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="white" stopOpacity="0.95" />
            <stop offset="1" stopColor="white" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <path
          d="M28 6c0-2 1.6-3.6 3.6-3.6h.8C34.4 2.4 36 4 36 6v14h10c2 0 3.6 1.6 3.6 3.6v.8C49.6 26.4 48 28 46 28H36v30c0 2-1.6 3.6-3.6 3.6h-.8C29.6 61.6 28 60 28 58V28H18c-2 0-3.6-1.6-3.6-3.6v-.8C14.4 21.6 16 20 18 20h10V6z"
          fill="url(#g)"
        />
        {/* лёгкая обводка для “металличности” */}
        <path
          d="M32 3.5c1 0 1.8.8 1.8 1.8v16.2H46c1 0 1.8.8 1.8 1.8v.4c0 1-.8 1.8-1.8 1.8H33.8V58.7c0 1-.8 1.8-1.8 1.8h-.4c-1 0-1.8-.8-1.8-1.8V27.3H18c-1 0-1.8-.8-1.8-1.8v-.4c0-1 .8-1.8 1.8-1.8h11.8V5.3c0-1 .8-1.8 1.8-1.8h.4z"
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
      </svg>
    </motion.div>
  );
}
