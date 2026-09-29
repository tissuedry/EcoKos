import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  height?: "sm" | "md" | "lg";
  barClassName?: string;
  className?: string;
}

const HEIGHTS = { sm: "h-1.5", md: "h-2", lg: "h-3" } as const;

export function ProgressBar({ value, label, height = "md", barClassName, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("w-full overflow-hidden rounded-full bg-surface-high", HEIGHTS[height], className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", barClassName ?? "bg-emerald")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
