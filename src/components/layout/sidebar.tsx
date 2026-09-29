"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { UserSession } from "@/types";
import { NAV_ITEMS } from "./nav-items";

interface SidebarProps {
  session: UserSession;
  ecoScore: number;
  onNavigate?: () => void;
}

export function Sidebar({ session, ecoScore, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between bg-white">
      <div>
        <div className="flex h-16 items-center gap-2 px-6">
          <LogoMark />
          <div>
            <p className="text-lg leading-6 font-bold tracking-tight text-primary">EcoKos</p>
            <p className="text-[11px] leading-3.5 font-medium text-ink-muted">Smart Living Kos</p>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="flex flex-col gap-1 rounded-xl bg-surface-low p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-ink-muted">Status Kamar</span>
              <Badge dot>Aktif</Badge>
            </div>
            <p className="truncate text-xs font-semibold">
              Kamar {session.room} • {session.kos.replace(/^Kos /, "")}
            </p>
          </div>
        </div>

        <nav aria-label="Navigasi utama" className="flex flex-col gap-1 px-4 pt-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-emerald text-on-emerald shadow-card"
                    : "text-ink-muted hover:bg-surface-low",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 rounded-xl bg-surface-low p-4">
          <span className="grid size-9 place-items-center rounded-full bg-mint text-primary">
            <Leaf className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-bold text-ink-muted">Eco Score Bulanan</p>
            <p className="text-lg leading-6 font-bold text-primary">
              {ecoScore} <span className="text-xs font-normal text-ink-muted">(Hijau)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
