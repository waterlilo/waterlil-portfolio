"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

function StatusPill({ label }: { label: string }) {
  const pulse = {
    backgroundColor: [
      "rgba(255,255,255,0.025)",
      "rgba(255,255,255,0.045)",
      "rgba(255,255,255,0.025)",
    ],
    boxShadow: [
      "0 0 0px rgba(96,165,250,0)",
      "0 0 18px rgba(96,165,250,0.14)",
      "0 0 0px rgba(96,165,250,0)",
    ],
  };

  const transition = {
    duration: 2.6,
    ease: "easeInOut",
    repeat: Infinity,
  };

  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-fg-dim"
      animate={pulse}
      transition={transition}
      style={{ willChange: "box-shadow, background-color" }}
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-white"
        animate={{
          opacity: [0.45, 1, 0.45],
          scale: [1, 1.15, 1],
        }}
        transition={transition}
        style={{
          boxShadow: "0 0 6px rgba(96,165,250,0.35)",
          willChange: "transform, opacity",
        }}
      />
      <span>{label}</span>
    </motion.div>
  );
}


function SocialButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-full border border-line bg-white/0 px-5 py-3 text-sm font-medium text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      aria-label={label}
    >
      {label}
    </a>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      // title убираем — будем рисовать “Available For Work” как пилюлю
      className="pb-10 md:pb-12 overflow-hidden"
      background={
        // однотонный фон, чуть темнее (можешь менять /45 -> /55)
        <div className="absolute inset-0 bg-black/55" />
      }
    >
      <div className="space-y-10 -mt-6 md:-mt-10">
        {/* Пилюля сверху как на примере */}
        <Reveal>
          <div className="flex justify-center">
            <StatusPill label="Available For Work" />
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <Reveal delay={0.05}>
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold text-fg leading-[1.05]">
                Ready to work together and take your content to the next level?
              </h3>
              <p className="mt-4 text-base text-fg-dim max-w-xl">
                Send a quick message with your channel/brand + what you’re trying to achieve — I’ll reply with next steps.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[22px] border border-line bg-white/0 p-5 md:p-6">
              <a
                href={`mailto:${site.email}`}
                className="block text-xl md:text-2xl font-semibold text-fg hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                aria-label="Email Waterlil"
              >
                {site.email}
              </a>

              <div className="mt-5 flex flex-wrap gap-3">
                <SocialButton href={`mailto:${site.email}`} label="Email" />
                <SocialButton href={site.links.telegram} label="Telegram" />
              </div>

              <div className="mt-8 border-t border-line pt-4 text-xs text-fg-dim">
                All rights reserved, ©2025
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
