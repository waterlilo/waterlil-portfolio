"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Section } from "@/components/Section";
import { Tabs } from "@/components/Tabs";
import { categories, type Category } from "@/lib/site";
import projectsRaw from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./motion";
import { WaveGL } from "@/components/WaveGL";

type Tab = "All" | Category;

export function Projects() {
  const [tab, setTab] = useState<Tab>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const projects = projectsRaw as Project[];

  const filtered = useMemo(() => {
    if (tab === "All") return projects;
    return projects.filter((p) => p.category === tab);
  }, [projects, tab]);

  // ----------------------------
  // ✅ 2 высоты: All и Other
  // ----------------------------
  const [allHeight, setAllHeight] = useState<number | null>(null);
  const [otherHeight, setOtherHeight] = useState<number | null>(null);
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);

  // ----------------------------
  // ✅ refs для скрытого измерения
  // ----------------------------
  const measureWrapRef = useRef<HTMLDivElement | null>(null);
  const measureAllRef = useRef<HTMLDivElement | null>(null);
  const measureOtherMapRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const otherTabs = useMemo(() => {
    // categories: { id: "All" | Category; label: string }[]
    return categories
      .map((c) => c.id)
      .filter((id): id is Category => id !== "All");
  }, []);

  const measureAllAndOther = () => {
    const allEl = measureAllRef.current;
    if (!allEl) return;

    const nextAll = allEl.scrollHeight;

    let nextOther = 0;
    for (const c of otherTabs) {
      const el = measureOtherMapRef.current.get(c);
      if (!el) continue;
      nextOther = Math.max(nextOther, el.scrollHeight);
    }

    if (nextAll > 0) setAllHeight(nextAll);
    if (nextOther > 0) setOtherHeight(nextOther);
  };

  useLayoutEffect(() => {
    measureAllAndOther();

    const raf = requestAnimationFrame(measureAllAndOther);
    const t = window.setTimeout(measureAllAndOther, 80);

    const wrap = measureWrapRef.current;
    if (!wrap) return;

    const ro = new ResizeObserver(measureAllAndOther);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tab === "All") {
      if (allHeight != null) setCurrentHeight(allHeight);
    } else {
      if (otherHeight != null) setCurrentHeight(otherHeight);
    }
  }, [tab, allHeight, otherHeight]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Recent Work"
      className="overflow-hidden"
      background={
        <>
          <WaveGL />
          <div className="absolute inset-0 bg-black/35" />
        </>
      }
    >
      <div className="relative z-10">
        <Reveal>
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <Tabs
              items={categories as any}
              value={tab}
              onChange={(v) => setTab(v as Tab)}
            />
            <div className="text-xs text-fg-dim">
              {filtered.length} project{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </Reveal>

        {/* ✅ Скрытый измеритель (All + все категории) */}
        <div
          ref={measureWrapRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-full opacity-0"
        >
          {/* All */}
          <div ref={measureAllRef} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard
                  key={`m-all-${p.id}`}
                  project={p}
                  onOpen={() => {}}
                  measure
                />
              ))}
            </div>
          </div>

          {/* Каждая категория (для max -> otherHeight) */}
          {otherTabs.map((c) => {
            const list = projects.filter((p) => p.category === c);

            return (
              <div
                key={`m-${c}`}
                ref={(el) => {
                  if (!el) {
                    measureOtherMapRef.current.delete(c);
                    return;
                  }
                  measureOtherMapRef.current.set(c, el);
                }}
                className="mt-10"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <ProjectCard
                      key={`m-${c}-${p.id}`}
                      project={p}
                      onOpen={() => {}}
                      measure
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Анимируемый контейнер: ТОЛЬКО 2 высоты */}
        <motion.div
          className="mt-10 overflow-hidden"
          animate={currentHeight != null ? { height: currentHeight } : undefined}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: currentHeight != null ? currentHeight : "auto" }}
        >
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.985 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={p} onOpen={setOpen} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <ProjectModal project={open} onClose={() => setOpen(null)} />
      </div>
    </Section>
  );
}
