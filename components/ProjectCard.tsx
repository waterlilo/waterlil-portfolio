"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  title: string;
  category: "Long-form" | "Short-form" | "Ads / UGC" | "Motion / VFX";
  type: string;
  meta?: string;
  thumb: string;
  video:
    | { kind: "youtube"; id: string }
    | { kind: "vimeo"; id: string }
    | { kind: "mp4"; src: string }
    | { kind: "comingSoon" };
  summary: string;
  role: string;
  tools: string[];
};

export function ProjectCard({
  project,
  onOpen
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "group w-full text-left rounded-2xl border border-line bg-white/0",
        "overflow-hidden transition-shadow hover:shadow-soft",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      )}
      aria-label={`Open project ${project.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.thumb}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-fg">{project.title}</div>
            <div className="mt-1 text-xs text-fg-dim">
              {project.type}
              {project.meta ? ` · ${project.meta}` : ""}
            </div>
          </div>

          <div className="mt-0.5 inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[11px] text-fg-dim">
            {project.category}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
