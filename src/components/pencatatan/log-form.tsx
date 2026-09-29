"use client";

import { Activity, ChevronDown, ChevronsUpDown, Clock, Plug, Timer, X, Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/select";
import { APPLIANCES, TIME_RANGES } from "@/data/pencatatan";
import { estimateEnergy } from "@/lib/energy";
import { formatKwh, formatRupiah } from "@/lib/format";
import type { ElectricityLog } from "@/types";

interface LogFormProps {
  /** Jika terisi, form berada dalam mode edit. */
  editing: ElectricityLog | null;
  onSubmit: (values: Omit<ElectricityLog, "id" | "timestamp">) => void;
  onCancelEdit: () => void;
}

export function LogForm({ editing, onSubmit, onCancelEdit }: LogFormProps) {
  const [applianceId, setApplianceId] = useState(editing?.applianceId ?? APPLIANCES[0].id);
  const [hours, setHours] = useState(editing ? String(editing.hours) : "4");
  const [range, setRange] = useState<string>(editing?.range ?? TIME_RANGES[0]);
  const [error, setError] = useState("");

  const appliance = APPLIANCES.find((item) => item.id === applianceId) ?? APPLIANCES[0];
  const parsedHours = Number(hours.replace(",", "."));
  const validHours = Number.isFinite(parsedHours) && parsedHours > 0 && parsedHours <= 24;
  const estimate = estimateEnergy(appliance, validHours ? parsedHours : 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validHours) {
      setError("Durasi harus antara 0 – 24 jam.");
      return;
    }
    setError("");
    onSubmit({
      applianceId: appliance.id,
      category: appliance.category,
      title: appliance.name,
      description: `Durasi ${parsedHours} jam • ${range.split(" (")[0]}`,
      kwh: Number(estimate.kwh.toFixed(2)),
      hours: parsedHours,
      range,
    });
    if (!editing) setHours("4");
  };

  return (
    <Card className="rounded-2xl border border-slate-200/70 p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Header Form */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-2xs">
              <Zap className="size-5" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink">
                {editing ? "Ubah Log" : "Tambah Log Baru"}
              </h2>
              <p className="text-xs text-ink-muted font-medium">
                Pencatatan konsumsi daya perangkat elektronik kamar
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
            <Zap className="size-3.5 fill-emerald-600 text-emerald-600" aria-hidden />
            Mode Telemetri Listrik Aktif
          </span>
        </div>

        {/* 3 Input Columns */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Kolom 1: Peralatan Kos */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="appliance" className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              PERALATAN KOS <span className="text-danger">*</span>
            </label>
            <CustomSelect
              value={applianceId}
              onChange={setApplianceId}
              options={APPLIANCES.map((item) => ({
                value: item.id,
                label: item.name,
                description: `${(item.powerKw * 1000).toFixed(0)} Watt • ${item.category}`,
              }))}
              icon={<Plug className="size-4 shrink-0 text-emerald-500" aria-hidden />}
              rightIcon="chevrons"
              ariaLabel="Pilih Peralatan Kos"
            />
          </div>

          {/* Kolom 2: Durasi Pemakaian */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="hours" className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              DURASI PEMAKAIAN <span className="text-danger">*</span>
            </label>
            <div className="relative flex h-12 w-full items-center rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 transition-all hover:border-slate-300 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
              <Timer className="mr-2.5 size-4 shrink-0 text-emerald-500" aria-hidden />
              <input
                id="hours"
                inputMode="decimal"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                aria-invalid={Boolean(error)}
                className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
              />
              <span className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-500 shadow-2xs">
                Jam
              </span>
            </div>
            {error && <p role="alert" className="text-[11px] font-medium text-danger">{error}</p>}
          </div>

          {/* Kolom 3: Rentang Waktu */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="range" className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              RENTANG WAKTU <span className="font-normal text-slate-400">(OPSIONAL)</span>
            </label>
            <CustomSelect
              value={range}
              onChange={setRange}
              options={TIME_RANGES.map((item) => ({
                value: item,
                label: item,
              }))}
              icon={<Clock className="size-4 shrink-0 text-emerald-500" aria-hidden />}
              rightIcon="chevron"
              ariaLabel="Pilih Rentang Waktu"
            />
          </div>
        </div>

        {/* Bottom Estimation Bar & Submit Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100/60 bg-[#F6FBF9] p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-emerald-500 text-white shadow-2xs">
              <Activity className="size-5" aria-hidden />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  ESTIMASI KONSUMSI BEBAN
                </span>
                <span className="rounded bg-emerald-100/80 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Auto
                </span>
              </div>
              <p aria-live="polite" className="text-sm font-bold text-ink">
                ~{formatKwh(estimate.kwh)}{" "}
                <span className="font-normal text-ink-muted">
                  ({formatRupiah(estimate.cost)} • {estimate.co2.toFixed(2)} kg CO2e)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editing && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-ink-muted hover:bg-slate-200/60 transition-colors"
              >
                <X className="size-4" aria-hidden />
                Batal
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#005c3c] hover:bg-[#004930] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
            >
              <Plug className="size-4" aria-hidden />
              {editing ? "Perbarui Log" : "Simpan Log Listrik"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
