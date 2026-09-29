"use client";

import { Activity, Radio, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { DAILY_TELEMETRY, SMART_PLUGS } from "@/data/tantangan";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";

export function ApplianceBreakdown() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = SMART_PLUGS.find((plug) => plug.id === selectedId);
  const averageKwh = DAILY_TELEMETRY.reduce((sum, day) => sum + day.kwh, 0) / DAILY_TELEMETRY.length;

  return (
    <Card id="breakdown" className="flex scroll-mt-20 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Activity className="size-4 text-primary" aria-hidden />
          Breakdown Beban Kamar (4 Smart-Plug Telemetri)
        </h2>
        <Badge tone="neutral" icon={<Radio className="size-3" />}>4 Smart-Plug Terkoneksi &amp; Aktif</Badge>
      </div>
      <p className="text-[13px] text-ink-muted">
        Rincian jam pemakaian telemetri langsung Kamar 204 dari sensor colokan pintar EcoKos. Klik peralatan untuk
        filter rincian.
      </p>

      <ul className="grid gap-4 pt-1 sm:grid-cols-2 xl:grid-cols-4">
        {SMART_PLUGS.map(({ id, name, icon: Icon, percent, kwh, cost, usage, accent, bar }) => {
          const active = id === selectedId;
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(active ? null : id)}
                className={cn(
                  "flex h-full w-full flex-col gap-3 rounded-xl border-2 bg-surface-low p-[18px] text-left transition-colors hover:bg-surface-mid",
                  active ? "border-primary" : "border-transparent",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-white shadow-card">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className={cn("text-lg font-bold", accent)}>{percent}%</span>
                </span>
                <span>
                  <span className="block text-sm font-bold">{name}</span>
                  <span className="flex justify-between pt-0.5 text-[13px]">
                    <span className="text-ink-muted">~{kwh} kWh</span>
                    <span className="font-semibold">{formatRupiah(cost)}</span>
                  </span>
                  <span className="block text-[11px] leading-[22px] text-ink-muted">{usage}</span>
                </span>
                <ProgressBar value={percent} height="sm" barClassName={bar} label={`Porsi ${name}`} />
              </button>
            </li>
          );
        })}
      </ul>

      {selected && (
        <p role="status" className="rounded-xl bg-mint/40 px-4 py-2 text-xs font-semibold text-on-mint">
          Filter aktif: {selected.name} menyumbang {selected.percent}% beban ({selected.kwh} kWh) bulan ini.
        </p>
      )}

      <div className="flex flex-col gap-2 rounded-2xl bg-surface-low p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-[15px] text-primary" aria-hidden />
            <div>
              <p className="text-sm font-bold">Fluktuasi Telemetri Harian (7 Hari Terakhir)</p>
              <p className="text-[13px] text-ink-muted">Pemantauan konsumsi daya otomatis tiap 4 jam</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge dot>Rata-rata: {averageKwh.toFixed(1)} kWh/hari</Badge>
            <Badge tone="outline" className="font-normal">Beban Puncak: 19:00 - 22:00 WIB</Badge>
          </div>
        </div>

        <div className="h-48 w-full" role="img" aria-label="Grafik fluktuasi konsumsi 7 hari terakhir">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DAILY_TELEMETRY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="telemetryFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006c49" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#006c49" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#dae2fd" strokeDasharray="4 4" />
              <XAxis dataKey="short" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 4]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6c7a71" }} />
              <Tooltip formatter={(value) => [`${value} kWh`, "Pemakaian"]} contentStyle={{ borderRadius: 12, border: "none" }} />
              <Area type="monotone" dataKey="kwh" stroke="#006c49" strokeWidth={3} fill="url(#telemetryFill)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <ul className="grid grid-cols-2 gap-1 border-t border-surface-high pt-2 text-center text-[11px] sm:grid-cols-4 lg:grid-cols-7">
          {DAILY_TELEMETRY.map(({ day, kwh }) => {
            const lowest = kwh === Math.min(...DAILY_TELEMETRY.map((d) => d.kwh));
            return (
              <li key={day} className={cn("rounded-lg px-1 py-0.5", lowest && "bg-mint/30 text-primary")}>
                <span className={cn("block", lowest ? "font-bold" : "font-semibold")}>{day.replace(" (Hari Ini)", "")}</span>
                <span className="block font-bold text-ink-muted">
                  {kwh.toFixed(1)} kWh{lowest ? " (Tersedikit)" : ""}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
