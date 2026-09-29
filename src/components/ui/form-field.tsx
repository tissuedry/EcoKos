import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "w-full rounded-xl border border-transparent bg-surface-low py-2.5 pr-3 text-xs text-ink placeholder:text-ink-subtle " +
  "focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={htmlFor} className="text-xs font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[11px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

interface IconInputProps extends ComponentPropsWithoutRef<"input"> {
  icon: ReactNode;
  trailing?: ReactNode;
}

/** Input dengan ikon di kiri dan slot opsional di kanan. */
export function IconInput({ icon, trailing, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-subtle">{icon}</span>
      <input className={cn(inputClass, "pl-10", trailing ? "pr-10" : false, className)} {...props} />
      {trailing && <span className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</span>}
    </div>
  );
}
