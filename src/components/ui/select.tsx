"use client";

import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface CustomSelectProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: (SelectOption<T> | T)[];
  icon?: ReactNode;
  variant?: "form" | "filter" | "chip";
  rightIcon?: "chevron" | "chevrons";
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function CustomSelect<T extends string = string>({
  value,
  onChange,
  options,
  icon,
  variant = "form",
  rightIcon = "chevron",
  placeholder,
  className,
  buttonClassName,
  dropdownClassName,
  disabled = false,
  ariaLabel,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalisasi options ke format SelectOption
  const normalizedOptions: SelectOption<T>[] = options.map((opt) => {
    if (typeof opt === "object" && opt !== null && "value" in opt) {
      return opt as SelectOption<T>;
    }
    return { value: opt as T, label: String(opt) };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  // Base styling variants
  const getButtonStyles = () => {
    if (variant === "filter") {
      return cn(
        "flex h-10 items-center justify-between gap-2 rounded-full border border-slate-200/80 bg-surface-low px-4 text-xs font-semibold text-ink transition-all hover:bg-surface-mid hover:border-slate-300",
        open && "border-primary/50 ring-2 ring-primary/20 bg-white",
        buttonClassName,
      );
    }
    if (variant === "chip") {
      return cn(
        "flex items-center gap-1 text-sm font-bold text-ink cursor-pointer outline-none hover:text-primary transition-colors",
        buttonClassName,
      );
    }
    // "form" variant (default)
    return cn(
      "relative flex h-12 w-full items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 text-sm font-semibold text-ink transition-all hover:border-slate-300",
      open ? "border-primary bg-white ring-2 ring-primary/20 shadow-xs" : "focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20",
      disabled && "opacity-50 cursor-not-allowed",
      buttonClassName,
    );
  };

  return (
    <div ref={containerRef} className={cn("relative", variant !== "chip" && "w-full", className)} onKeyDown={handleKeyDown}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={getButtonStyles()}
      >
        <div className="flex min-w-0 items-center gap-2 truncate">
          {icon}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder ?? "Pilih..."}
          </span>
          {variant === "chip" && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
        </div>

        <div className="ml-1 flex items-center shrink-0 text-slate-400">
          {rightIcon === "chevrons" ? (
            <ChevronsUpDown className="size-4" aria-hidden />
          ) : (
            <ChevronDown
              className={cn("size-3.5 transition-transform duration-200", open && "rotate-180 text-primary")}
              aria-hidden
            />
          )}
        </div>
      </button>

      {/* Floating Menu Popover */}
      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute z-50 mt-1.5 max-h-64 overflow-auto rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-xl backdrop-blur-md transition-all animate-in fade-in-0 zoom-in-95",
            variant === "form" ? "left-0 w-full min-w-[200px]" : "right-0 w-max min-w-[190px]",
            dropdownClassName,
          )}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-semibold transition-colors cursor-pointer",
                  isSelected
                    ? "bg-emerald-50 text-primary font-bold"
                    : "text-ink hover:bg-slate-50 hover:text-emerald-700",
                )}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon}
                  <div className="flex flex-col truncate">
                    <span className="truncate">{opt.label}</span>
                    {opt.description && (
                      <span className="text-[11px] font-normal text-slate-400">
                        {opt.description}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <Check className="ml-2 size-4 shrink-0 text-primary" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
