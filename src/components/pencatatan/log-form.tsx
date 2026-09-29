"use client";

import { Calculator, Save, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APPLIANCES, TIME_RANGES } from "@/data/pencatatan";
import { estimateEnergy } from "@/lib/energy";
import { formatKwh, formatRupiah } from "@/lib/format";
import type { ElectricityLog } from "@/types";

const fieldClass =
  "h-11 w-full rounded-xl border border-ink-subtle/60 bg-surface-low px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

interface LogFormProps {
  /** Jika terisi, form berada dalam mode edit. */
  editing: ElectricityLog | null;
  onSubmit: (values: Omit<ElectricityLog, "id" | "timestamp">) => void;
  onCancelEdit: () => void;
}

export function LogForm({ editing, onSubmit, onCancelEdit }: LogFormProps) {
  // State awal diambil dari log yang diedit; parent memberi `key` agar form di-reset saat baris berganti.
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
    <Card className="overflow-hidden">
      <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/5 blur-3xl" />
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div>
            <h2 className="text-lg font-semibold">{editing ? "Ubah Log" : "Tambah Log Baru"}</h2>
            <p className="text-[11px] font-bold text-ink-muted">Pencatatan konsumsi daya perangkat elektronik kamar</p>
          </div>
          <Badge>Mode Telemetri Listrik Aktif</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="appliance" className="text-[11px] font-semibold tracking-wide text-ink-muted">Peralatan Kos</label>
            <select id="appliance" value={applianceId} onChange={(event) => setApplianceId(event.target.value)} className={fieldClass}>
              {APPLIANCES.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="hours" className="text-[11px] font-semibold tracking-wide text-ink-muted">Durasi Pemakaian</label>
            <div className="relative">
              <input
                id="hours"
                inputMode="decimal"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                aria-invalid={Boolean(error)}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[11px] font-bold text-ink-subtle">Jam</span>
            </div>
            {error && <p role="alert" className="text-[11px] font-medium text-danger">{error}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="range" className="text-[11px] font-semibold tracking-wide text-ink-muted">Rentang Waktu</label>
            <select id="range" value={range} onChange={(event) => setRange(event.target.value)} className={fieldClass}>
              {TIME_RANGES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-low p-4">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-mint text-primary">
              <Calculator className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-bold text-ink-muted">Estimasi Konsumsi Otomatis</p>
              <p aria-live="polite" className="text-xs font-semibold">
                ~{formatKwh(estimate.kwh)} ({formatRupiah(estimate.cost)} • {estimate.co2.toFixed(2)} kg CO2e)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {editing && (
              <Button variant="ghost" onClick={onCancelEdit}>
                <X className="size-4" aria-hidden />
                Batal
              </Button>
            )}
            <Button type="submit">
              <Save className="size-4" aria-hidden />
              {editing ? "Perbarui Log" : "Simpan Log Listrik"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
