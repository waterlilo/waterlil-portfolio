"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";

const nav = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "backdrop-blur supports-[backdrop-filter]:bg-bg/55",
        scrolled ? "border-b border-line" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#top"
            className="text-sm font-semibold tracking-wide text-fg hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
            aria-label="Go to top"
          >
            {site.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-fg-dim">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="hover:text-fg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              >
                {i.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <MobileMenu items={nav} />
          </div>
        </div>
      </div>
    </header>
  );
}
