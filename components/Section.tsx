import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  background
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-28 border-t border-line/80",
        "py-16 md:py-24",
        className
      )}
    >
      {background}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        {(eyebrow || title) && (
          <div className="mb-10 md:mb-12">
            {eyebrow && (
              <div className="text-xs tracking-[0.18em] uppercase text-fg-dim">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-fg">
                {title}
              </h2>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
