import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary/90",
  emerald: "bg-emerald text-white hover:bg-emerald/90 shadow-float",
  soft: "bg-white text-primary hover:bg-surface-low shadow-card",
  outline: "border border-teal text-teal hover:bg-teal/5",
  ghost: "bg-surface-mid text-ink-muted hover:bg-surface-high",
  glass: "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md",
} as const;

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
} as const;

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  rounded?: "full" | "xl";
}

export function Button({
  variant = "primary",
  size = "md",
  rounded = "full",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        rounded === "full" ? "rounded-full" : "rounded-xl",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
