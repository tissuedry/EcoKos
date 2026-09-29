"use client";

import { MapPin, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export function GreetingBar({ name, room, kos }: { name: string; room: string; kos: string }) {
  const toast = useToast();
  const [syncing, setSyncing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("10 menit yang lalu");

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setUpdatedAt("baru saja");
      toast.show("Data telemetri berhasil disinkronkan");
    }, 900);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-surface-low p-6 shadow-card">
      <div aria-hidden className="absolute -top-16 -right-16 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Badge dot className="w-fit">Status: Hemat Berkelanjutan</Badge>
          <h1 className="pt-1 text-[32px] leading-10 font-bold tracking-tight">Halo, {name.split(" ")[0]}! 🌱</h1>
          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin className="size-3.5" aria-hidden />
            Kamar {room} • {kos.replace(/\s*\(.*\)$/, "")} • Minggu ke-3 September
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-[11px] font-bold text-ink-muted">Update Telemetri</p>
            <p className="text-xs font-semibold">{updatedAt}</p>
          </div>
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-card hover:bg-surface-mid disabled:opacity-60"
          >
            <RefreshCw className={syncing ? "size-3.5 animate-spin" : "size-3.5"} aria-hidden />
            Sinkron Data
          </button>
        </div>
      </div>
    </section>
  );
}
