"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "./ProjectCard";

type VideoSrc =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "mp4"; src: string }
  | { kind: "comingSoon" };

type ModalProject = Project & {
  year?: string | number;
  tools?: string[];
  description?: string;
  role?: string;
  category?: string;
  video?: VideoSrc;
};

export function ProjectModal({
  project,
  onClose
}: {
  project: ModalProject | null;
  onClose: () => void;
}) {
  // ESC close
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  // lock body scroll
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  return (
    // ✅ важно: mode="wait" для красивого переключения/закрытия
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          aria-label={`Project details: ${project.title}`}
        >
          {/* overlay */}
          <motion.button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* centered wrapper */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              // ✅ ключевое: тот же layoutId что и у ProjectCard
              layoutId={`project-${project.id}`}
              className="relative w-full max-w-[980px] overflow-hidden rounded-2xl border border-white/10 bg-bg-soft/95 shadow-soft"
              initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 18, scale: 0.99, filter: "blur(6px)" }}
              transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
              // ✅ чтобы клик внутри модалки не “пробивал” в overlay
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/30 text-fg hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                ✕
              </button>

              <div className="max-h-[min(78vh,760px)] overflow-y-auto overscroll-contain">
                <div className="p-5 sm:p-6">
                  {/* header */}
                  <div className="mb-4">
                    <div className="text-sm text-fg-dim">
                      {project.category ?? ""}
                      {project.tools?.length ? ` • ${project.tools.join(", ")}` : ""}
                      {project.year ? ` • ${project.year}` : ""}
                    </div>
                    <div className="mt-2 text-lg sm:text-xl font-semibold text-fg">
                      {project.title}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:gap-6 md:grid-cols-[1.6fr_1fr]">
                    {/* media */}
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                      <div className="aspect-video w-full">
                        {project.video?.kind === "youtube" ? (
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${project.video.id}`}
                            title={project.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : project.video?.kind === "vimeo" ? (
                          <iframe
                            className="h-full w-full"
                            src={`https://player.vimeo.com/video/${project.video.id}`}
                            title={project.title}
                            loading="lazy"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        ) : project.video?.kind === "mp4" ? (
                          <video className="h-full w-full" controls preload="metadata">
                            <source src={project.video.src} />
                          </video>
                        ) : (
                          <div className="grid h-full w-full place-items-center text-sm text-fg-dim">
                            Coming soon
                          </div>
                        )}
                      </div>
                    </div>

                    {/* details */}
                    <div className="space-y-4">
                      {project.description ? (
                        <div className="text-sm leading-relaxed text-fg-dim">
                          {project.description}
                        </div>
                      ) : null}

                      {project.role ? (
                        <div>
                          <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">
                            Role
                          </div>
                          <div className="mt-2 text-sm text-fg">{project.role}</div>
                        </div>
                      ) : null}

                      {project.tools?.length ? (
                        <div>
                          <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">
                            Tools
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-fg-dim"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-3" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
