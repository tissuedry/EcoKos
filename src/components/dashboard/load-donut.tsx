"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LOAD_BREAKDOWN } from "@/data/dashboard";
import { cn } from "@/lib/cn";

export function LoadDonut() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlice = LOAD_BREAKDOWN[activeIndex] ?? LOAD_BREAKDOWN[0];

  return (
    <Card className="flex flex-col gap-2 lg:col-span-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">Beban Elektronik Kamar</h2>
        <Badge tone="neutral">Total 14.2 kWh</Badge>
      </div>
      <p className="text-[13px] text-ink-muted">Proporsi konsumsi daya per kelompok peralatan listrik</p>

      <div className="relative mx-auto my-3 size-52" role="img" aria-label="Diagram donat proporsi beban listrik">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={LOAD_BREAKDOWN}
              dataKey="percent"
              nameKey="name"
              innerRadius={62}
              outerRadius={84}
              paddingAngle={4}
              cornerRadius={8}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {LOAD_BREAKDOWN.map((slice, index) => (
                <Cell
                  key={slice.name}
                  fill={slice.color}
                  className="cursor-pointer transition-all duration-200"
                  opacity={activeIndex === index ? 1 : 0.65}
                  stroke={activeIndex === index ? "#fff" : "none"}
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Dynamic Label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <p className="text-[26px] leading-7 font-bold tracking-tight text-ink transition-all duration-200">
            {activeSlice.percent}%
          </p>
          <p className="mt-1 max-w-[110px] text-[11px] leading-tight font-bold text-ink-muted transition-all duration-200">
            {activeSlice.name}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
            {activeSlice.kwh.toFixed(1)} kWh
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-1">
        {LOAD_BREAKDOWN.map(({ name, percent, kwh, color }, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={name}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex items-center justify-between rounded-xl p-2 transition-all cursor-pointer",
                isActive
                  ? "bg-surface-mid ring-1 ring-primary/25 shadow-2xs"
                  : "bg-surface-low hover:bg-surface-mid/60",
              )}
            >
              <span className="flex items-center gap-2 text-xs font-semibold text-ink">
                <span className="size-3 rounded-full shrink-0" style={{ background: color }} />
                {name}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-ink">
                {percent}%
                <span className="text-[11px] font-normal text-ink-muted">({kwh.toFixed(1)} kWh)</span>
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
