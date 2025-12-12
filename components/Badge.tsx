import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/0 px-3 py-1",
        "text-xs text-fg-dim",
        className
      )}
    >
      {children}
    </span>
  );
}
