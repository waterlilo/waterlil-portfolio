"use client";

import { useEffect, useState } from "react";

export function WaveBackground({ className = "" }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduceMotion(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* darker edges, center stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.40) 62%, rgba(0,0,0,0.78) 100%)"
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        style={{ opacity: 1 }}
      >
        <defs>
          {/* Smooth distortion (no blobs) */}
          <filter id="ribbon" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.006 0.018"
              numOctaves="1"
              seed="4"
              result="n"
            >
              {!reduceMotion && (
                <>
                  {/* slower + smaller change */}
                  <animate
                    attributeName="baseFrequency"
                    dur="16s"
                    repeatCount="indefinite"
                    values="0.006 0.018; 0.008 0.014; 0.006 0.018"
                  />
                  <animate
                    attributeName="seed"
                    dur="20s"
                    repeatCount="indefinite"
                    values="4; 8; 4"
                  />
                </>
              )}
            </feTurbulence>

            {/* less scale = less “cartoon” */}
            <feDisplacementMap in="SourceGraphic" in2="n" scale="28" xChannelSelector="R" yChannelSelector="G" />

            {/* silk blur */}
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* Crest a bit sharper but still soft */}
          <filter id="crest" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.005 0.014"
              numOctaves="1"
              seed="7"
              result="n2"
            >
              {!reduceMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="18s"
                  repeatCount="indefinite"
                  values="0.005 0.014; 0.007 0.010; 0.005 0.014"
                />
              )}
            </feTurbulence>

            <feDisplacementMap in="SourceGraphic" in2="n2" scale="18" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="5.5" />
          </filter>

          {/* center mask: thinner band like the original */}
          <linearGradient id="centerFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="34%" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="66%" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <mask id="maskCenter" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1600" height="900" fill="url(#centerFade)" />
          </mask>

          {/* body gradient: darker + less “white” */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(60,120,220,0)" />
            <stop offset="30%" stopColor="rgba(70,135,235,0.12)" />
            <stop offset="50%" stopColor="rgba(120,190,255,0.22)" />
            <stop offset="70%" stopColor="rgba(70,135,235,0.12)" />
            <stop offset="100%" stopColor="rgba(60,120,220,0)" />
          </linearGradient>

          {/* subtle crest */}
          <linearGradient id="crestGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(200,245,255,0)" />
            <stop offset="50%" stopColor="rgba(210,250,255,0.55)" />
            <stop offset="100%" stopColor="rgba(200,245,255,0)" />
          </linearGradient>
        </defs>

        <g mask="url(#maskCenter)">
          {/* main body (thin + subtle) */}
          <g filter="url(#ribbon)" opacity="0.9">
            <path
              d="M-260,475 C30,355 330,545 555,455 C810,350 1030,420 1230,490 C1450,555 1545,530 1900,405"
              fill="none"
              stroke="url(#bodyGrad)"
              strokeWidth="210"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* second layer for depth */}
            <path
              d="M-260,505 C10,410 360,610 625,510 C860,420 1080,470 1255,540 C1470,610 1600,585 1900,485"
              fill="none"
              stroke="rgba(80,145,255,0.10)"
              strokeWidth="165"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </g>

          {/* crest highlight (small, screen) */}
          <g filter="url(#crest)" style={{ mixBlendMode: "screen" as any }} opacity="0.8">
            <path
              d="M-240,465 C70,360 350,520 575,440 C835,340 1040,405 1240,475 C1465,540 1550,515 1860,395"
              fill="none"
              stroke="url(#crestGrad)"
              strokeWidth="70"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      {/* very subtle grain */}
      <div className="absolute inset-0 hero-grain opacity-[0.07]" />
    </div>
  );
}
