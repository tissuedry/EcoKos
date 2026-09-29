"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardHeading } from "@/components/ui/card";
import { PEAK_NOTES, WEEKLY_USAGE } from "@/data/dashboard";

const ROOM_COLOR = "#006c49";
const AVERAGE_COLOR = "#b8c4e6";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-bold">
      <span className="h-3 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export function UsageChart() {
  return (
    <Card className="flex flex-col gap-4 lg:col-span-7">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <CardHeading
          title="Konsumsi Listrik Harian"
          subtitle="Pelacakan daya harian Senin - Minggu (Kamar 204 vs Rata-rata Kos)"
        />
        <div className="flex items-center gap-3">
          <LegendDot color={ROOM_COLOR} label="Kamar 204" />
          <LegendDot color={AVERAGE_COLOR} label="Rata-rata Kos" />
        </div>
      </div>

      <div className="h-64 w-full" role="img" aria-label="Grafik konsumsi listrik harian kamar dibanding rata-rata kos">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={WEEKLY_USAGE} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="roomFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ROOM_COLOR} stopOpacity={0.25} />
                <stop offset="100%" stopColor={ROOM_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e2e7ff" strokeDasharray="4 4" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
            <YAxis
              domain={[0, 4]}
              ticks={[0, 2, 3, 4]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#6c7a71" }}
              tickFormatter={(value: number) => (value === 0 ? "0" : `${value} kWh`)}
            />
            <Tooltip formatter={(value) => [`${value} kWh`]} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }} />
            <Area type="monotone" dataKey="average" name="Rata-rata Kos" stroke={AVERAGE_COLOR} strokeWidth={2} strokeDasharray="5 4" fill="none" />
            <Area type="monotone" dataKey="room" name="Kamar 204" stroke={ROOM_COLOR} strokeWidth={3} fill="url(#roomFill)" activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-2 rounded-xl bg-surface-low p-2 sm:grid-cols-2">
        {PEAK_NOTES.map(({ color, label, detail }) => (
          <p key={label} className="flex items-center gap-2 p-1 text-[11px] font-bold">
            <span className={`size-2 shrink-0 rounded-full ${color}`} />
            <span>
              <span className="font-extrabold">{label}</span> {detail}
            </span>
          </p>
        ))}
      </div>
    </Card>
  );
}
