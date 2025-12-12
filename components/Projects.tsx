"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { Tabs } from "@/components/Tabs";
import { categories, type Category } from "@/lib/site";
import projectsRaw from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./motion";

type Tab = "All" | Category;

export function Projects() {
  const [tab, setTab] = useState<Tab>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const projects = projectsRaw as Project[];

  const filtered = useMemo(() => {
    if (tab === "All") return projects;
    return projects.filter((p) => p.category === tab);
  }, [projects, tab]);

  return (
    <Section id="projects" eyebrow="Projects" title="Recent Work">
      <Reveal>
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <Tabs items={categories as any} value={tab} onChange={(v) => setTab(v as Tab)} />
          <div className="text-xs text-fg-dim">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <Reveal key={p.id} delay={Math.min(0.06 * idx, 0.24)}>
            <ProjectCard project={p} onOpen={setOpen} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
