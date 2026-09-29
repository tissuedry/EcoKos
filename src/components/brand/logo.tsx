import { Leaf } from "lucide-react";
import { cn } from "@/lib/cn";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
}

/** Logo EcoKos versi SVG (aset asli Figma tidak bisa diunduh di lingkungan ini). */
export function LogoMark({ size = "sm", className }: LogoProps) {
  const box = size === "lg" ? "size-12 rounded-2xl" : "size-8 rounded-xl";
  const icon = size === "lg" ? "size-6" : "size-4";
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center bg-gradient-to-br from-emerald to-primary text-white shadow-card",
        box,
        className,
      )}
    >
      <Leaf className={icon} aria-hidden />
    </span>
  );
}
