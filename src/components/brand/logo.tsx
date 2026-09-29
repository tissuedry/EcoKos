import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export function LogoMark({ size = "sm", className }: LogoProps) {
  const dimension = size === "lg" ? 48 : 32;

  return (
    <Image
      src="/logo_ecokos.png"
      alt="Logo EcoKos"
      width={dimension}
      height={dimension}
      className={cn("shrink-0 object-contain", className)}
      priority
    />
  );
}