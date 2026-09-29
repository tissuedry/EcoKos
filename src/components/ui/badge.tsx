import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TONES = {
  mint: "bg-mint text-on-mint",
  cyan: "bg-cyan-soft text-on-cyan",
  peach: "bg-peach text-on-peach",
  neutral: "bg-surface-mid text-ink-muted",
  outline: "bg-white border border-line/30 text-ink",
} as const;

interface BadgeProps {
  tone?: keyof typeof TONES;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "mint", dot, icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wide whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-primary" />}
      {icon}
      {children}
    </span>
  );
}
