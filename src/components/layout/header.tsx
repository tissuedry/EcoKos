"use client";

import { Bell, ChevronDown, Home, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { UserSession } from "@/types";

interface HeaderProps {
  session: UserSession;
  ecoScore: number;
  onOpenMenu: () => void;
  onLogout: () => void;
}

export function Header({ session, ecoScore, onOpenMenu, onLogout }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between bg-canvas/80 px-4 shadow-header backdrop-blur-md sm:px-6 lg:left-72">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Buka menu"
          className="grid size-10 place-items-center rounded-full hover:bg-surface-mid lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <span className="hidden items-center gap-1 rounded-full bg-surface-mid px-4 py-1 text-xs font-semibold sm:inline-flex">
          <Home className="size-3" aria-hidden />
          Kamar {session.room} • {session.kos.replace(/\s*\(.*\)$/, "")}
        </span>
        <Badge dot className="hidden md:inline-flex">
          Eco Score: {ecoScore} (Hijau)
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative grid size-10 place-items-center rounded-full hover:bg-surface-mid"
        >
          <Bell className="size-[18px]" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-danger" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-mid"
          >
            <span className="grid size-8 place-items-center rounded-full bg-primary text-white">
              <User className="size-3" aria-hidden />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block max-w-32 truncate text-xs leading-4 font-semibold">{session.name}</span>
              <span className="block text-[11px] leading-3.5 font-bold text-ink-muted">Anak Kos Mandiri</span>
            </span>
            <ChevronDown className="size-3 text-ink-muted" aria-hidden />
          </button>

          {menuOpen && (
            <div role="menu" className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-1 shadow-float">
              <p className="truncate px-3 py-2 text-[11px] text-ink-muted">{session.email}</p>
              <button
                type="button"
                role="menuitem"
                onClick={onLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-danger hover:bg-surface-low"
              >
                <LogOut className="size-4" aria-hidden />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
