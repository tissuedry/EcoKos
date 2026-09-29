import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn("relative rounded-2xl bg-white p-6 shadow-card", className)}
      {...props}
    />
  );
}

interface CardHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function CardHeading({ title, subtitle, className }: CardHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {subtitle && <p className="text-[13px] text-ink-muted">{subtitle}</p>}
    </div>
  );
}
