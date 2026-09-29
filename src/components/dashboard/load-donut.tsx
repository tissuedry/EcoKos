"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LOAD_BREAKDOWN } from "@/data/dashboard";

export function LoadDonut() {
  const [top] = LOAD_BREAKDOWN;

  return (
    <Card className="flex flex-col gap-2 lg:col-span-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">Beban Elektronik Kamar</h2>
        <Badge tone="neutral">Total 14.2 kWh</Badge>
      </div>
      <p className="text-[13px] text-ink-muted">Proporsi konsumsi daya per kelompok peralatan listrik</p>

      <div className="relative mx-auto my-3 size-48" role="img" aria-label="Diagram donat proporsi beban listrik">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={LOAD_BREAKDOWN}
              dataKey="percent"
              innerRadius={62}
              outerRadius={82}
              paddingAngle={3}
              cornerRadius={8}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {LOAD_BREAKDOWN.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[32px] leading-8 font-bold tracking-tight">{top.percent}%</p>
            <p className="pt-1 text-[11px] font-bold text-ink-muted">Pendingin Ruang</p>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-1">
        {LOAD_BREAKDOWN.map(({ name, percent, kwh, color }) => (
          <li key={name} className="flex items-center justify-between rounded-xl bg-surface-low p-2">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-3 rounded-full" style={{ background: color }} />
              {name}
            </span>
            <span className="flex items-center gap-2 text-xs font-bold">
              {percent}%
              <span className="text-[11px] text-ink-muted">({kwh.toFixed(1)} kWh)</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
