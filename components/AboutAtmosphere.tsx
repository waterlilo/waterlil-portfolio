"use client";

import { motion } from "framer-motion";

export function AboutAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <BottomSmoke />
      <SmokeCrossCloud count={4} />
    </div>
  );
}

/** очень мягкий серый дым снизу по всей ширине */
function BottomSmoke() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[55%]"
      initial={{ y: 16, opacity: 0.045 }}
      animate={{ y: -8, opacity: 0.075 }}
      transition={{
        duration: 12,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
      style={{ filter: "blur(30px)", willChange: "transform, opacity" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white/14 via-white/6 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

      <div
        className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-white/8"
        style={{ filter: "blur(44px)" }}
      />
      <div
        className="absolute left-[28%] bottom-8 h-80 w-80 rounded-full bg-white/6"
        style={{ filter: "blur(52px)" }}
      />
      <div
        className="absolute right-[-80px] bottom-10 h-72 w-72 rounded-full bg-white/7"
        style={{ filter: "blur(50px)" }}
      />
    </motion.div>
  );
}

/**
 * Несколько “облаков” в форме креста:
 * - это не иконка, а дымный силуэт (очень мягкий)
 * - каждое облако медленно плывёт и слегка вращается
 */
function SmokeCrossCloud({ count = 3 }: { count?: number }) {
  const clouds = Array.from({ length: count });

  return (
    <>
      {clouds.map((_, i) => {
        // Разные параметры — чтобы не было одинаковых траекторий
        const size = [220, 180, 260, 200][i % 4];
        const startX = [-15, 10, 35, 60][i % 4]; // vw
        const startY = [58, 42, 28, 48][i % 4]; // %
        const driftX = [60, 40, 55, 35][i % 4]; // vw
        const driftY = [-10, -14, -8, -12][i % 4]; // vh
        const duration = [34, 42, 38, 46][i % 4];
        const delay = i * 4.5;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}vw`,
              top: `${startY}%`,
              width: size,
              height: size,
              filter: "blur(18px)",
              opacity: 0.085,
              willChange: "transform, opacity",
              mixBlendMode: "screen",
            }}
            initial={{ x: 0, y: 18, rotate: -8, opacity: 0 }}
            animate={{
              x: `${driftX}vw`,
              y: `${driftY}vh`,
              rotate: 10,
              opacity: [0, 0.085, 0.085, 0],
            }}
            transition={{
              duration,
              delay,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <CrossSmokeSvg />
          </motion.div>
        );
      })}
    </>
  );
}

/**
 * SVG “крест”, но мы используем его как маску дыма:
 * - мягкая заливка + внутренний градиент
 * - blur делается на контейнере выше
 */
function CrossSmokeSvg() {
  return (
    <svg
      viewBox="0 0 64 64"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="smoke" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="55%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M28 6c0-2 1.6-3.6 3.6-3.6h.8C34.4 2.4 36 4 36 6v14h10c2 0 3.6 1.6 3.6 3.6v.8C49.6 26.4 48 28 46 28H36v30c0 2-1.6 3.6-3.6 3.6h-.8C29.6 61.6 28 60 28 58V28H18c-2 0-3.6-1.6-3.6-3.6v-.8C14.4 21.6 16 20 18 20h10V6z"
        fill="url(#smoke)"
      />
    </svg>
  );
}
