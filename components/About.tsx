import Image from "next/image";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/motion";
import { site, softwareBadges } from "@/lib/site";
import { WaveGL } from "@/components/WaveGL";
import { AboutSnow } from "@/components/AboutSnow";


export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={`It’s ${site.name}`}
      background={
    <>
      <WaveGL />
      <div className="absolute inset-0 bg-black/35" />
      <AboutSnow count={14} />
    </>
  }
    >
      <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-start">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-white/0">
            <div className="relative aspect-[4/5]">
              <Image
                src="/thumbs/Kitty-_.png"
                alt="Waterlil portrait placeholder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.05}>
            <p className="text-base md:text-lg text-fg-dim leading-relaxed">
              I’m {site.name} — a video editor focused on high-retention pacing and clean premium visuals.
              I work with creators & brands who want edits that feel expensive and perform.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-fg-dim leading-relaxed">
              My approach is simple: hook fast, keep the story moving, cut ruthlessly, and support every beat
              with subtle motion and sound design — without over-editing.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base md:text-lg text-fg-dim leading-relaxed">
              From long-form YouTube to short-form reels and UGC ads: I build structure, polish, and clarity
              that helps you convert views into action.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="pt-2">
              <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">
                Toolset
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {softwareBadges.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
