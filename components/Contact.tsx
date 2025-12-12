import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

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
    <Section id="contact" eyebrow="Contact" title="Available For Work" className="pb-10 md:pb-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <Reveal>
          <h3 className="text-3xl md:text-4xl font-semibold text-fg leading-[1.05]">
            Ready to work together and take your content to the next level?
          </h3>
          <p className="mt-4 text-base text-fg-dim max-w-xl">
            Send a quick message with your channel/brand + what you’re trying to achieve — I’ll reply with next steps.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
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
    </Section>
  );
}
