"use client";

import { Fan, SlidersHorizontal, TrendingDown } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Card } from "@/components/ui/card";
import { SIMULATOR } from "@/data/tantangan";
import { formatRupiah } from "@/lib/format";

export function SavingsSimulator() {
  const [hours, setHours] = useState<number>(SIMULATOR.defaultHours);
  const saving = hours * SIMULATOR.savingPerHour;
  const fill = (hours / SIMULATOR.maxHours) * 100;

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <SlidersHorizontal className="size-4 text-primary" aria-hidden />
        Simulasi Hemat Mahasiswa
      </h2>
      <p className="text-[13px] text-ink-muted">
        Geser durasi pengurangan peralatan untuk melihat estimasi uang saku yang bisa diselamatkan setiap bulan.
      </p>

      <div className="flex flex-col gap-4 rounded-xl bg-surface-low p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="fan-hours" className="flex items-center gap-2 text-sm font-semibold">
            <Fan className="size-[15px] text-primary" aria-hidden />
            Kurangi durasi kipas angin / hari:
          </label>
          <span className="rounded-lg bg-white px-4 py-0.5 text-lg font-bold text-primary shadow-card">{hours} Jam / Hari</span>
        </div>
        <input
          id="fan-hours"
          type="range"
          className="eco-range"
          min={0}
          max={SIMULATOR.maxHours}
          step={1}
          value={hours}
          style={{ "--fill": `${fill}%` } as CSSProperties}
          onChange={(event) => setHours(Number(event.target.value))}
        />
        <div className="flex justify-between text-[11px] font-bold text-ink-muted">
          <span>0 Jam (Normal)</span>
          <span>4 Jam</span>
          <span>{SIMULATOR.maxHours} Jam (Maksimal)</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-card">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">Potensi Penghematan Ekstra</p>
            <p aria-live="polite" className="text-lg font-bold text-primary">
              Hemat {formatRupiah(saving)} / bulan
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-mint text-primary">
            <TrendingDown className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Card>
  );
}
