"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import type { Project } from "./ProjectCard";
import { Badge } from "./Badge";

function Video({ p }: { p: Project }) {
  if (p.video.kind === "comingSoon") {
    return (
      <div className="aspect-video w-full rounded-2xl border border-line bg-black/40 grid place-items-center">
        <div className="text-sm text-fg-dim">Coming soon</div>
      </div>
    );
  }

  if (p.video.kind === "youtube") {
    const src = `https://www.youtube-nocookie.com/embed/${p.video.id}?rel=0&modestbranding=1`;
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black/30">
        <iframe
          className="h-full w-full"
          src={src}
          title={p.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (p.video.kind === "vimeo") {
    const src = `https://player.vimeo.com/video/${p.video.id}`;
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black/30">
        <iframe
          className="h-full w-full"
          src={src}
          title={p.title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // mp4
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black/30">
      <video className="h-full w-full" controls preload="metadata">
        <source src={p.video.src} />
      </video>
    </div>
  );
}

export function ProjectModal({
  project,
  onClose
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-label="Close modal overlay"
          />

          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(94vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-line bg-bg-soft shadow-soft"
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.25 } }}
            exit={{ y: 16, opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <div id={titleId} className="text-sm font-semibold text-fg">
                  {project.title}
                </div>
                <div className="mt-1 text-xs text-fg-dim">
                  {project.type}
                  {project.meta ? ` · ${project.meta}` : ""}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/0 text-fg-dim hover:bg-white/5 hover:text-fg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Close modal"
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

            <div className="grid gap-5 p-5 md:grid-cols-[1.4fr_1fr]">
              <Video p={project} />

              <div className="space-y-4">
                <div className="text-sm text-fg-dim leading-relaxed">{project.summary}</div>

                <div className="space-y-2">
                  <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">Role</div>
                  <div className="text-sm text-fg">{project.role}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Badge className="text-fg">{project.category}</Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
