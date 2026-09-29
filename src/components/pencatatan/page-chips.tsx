"use client";

import { ChevronDown, Gauge, Pencil, Plug, Smile } from "lucide-react";
import { useState } from "react";
import { CustomSelect } from "@/components/ui/select";
import { VOLTAGE_STATUSES } from "@/data/pencatatan";

interface PageChipsProps {
  targetKwh: number;
  onTargetChange: (value: number) => void;
}

/** Dua kartu status di kanan atas: Target Harian dan Status Tegangan sesuai desain. */
export function PageChips({ targetKwh, onTargetChange }: PageChipsProps) {
  const [editingTarget, setEditingTarget] = useState(false);
  const [draftTarget, setDraftTarget] = useState(String(targetKwh));
  const [voltageIndex, setVoltageIndex] = useState(0);

  const commitTarget = () => {
    const value = Number(draftTarget.replace(",", "."));
    if (Number.isFinite(value) && value > 0) {
      onTargetChange(Number(value.toFixed(1)));
    }
    setEditingTarget(false);
  };

  const cycleVoltage = () => {
    setVoltageIndex((index) => (index + 1) % VOLTAGE_STATUSES.length);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Kartu Target Harian */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-3.5 py-2 shadow-2xs transition-all hover:border-slate-300">
        <div className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Smile className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            TARGET HARIAN
          </span>
          {editingTarget ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitTarget();
              }}
              className="flex items-center gap-1"
            >
              <span className="text-xs font-bold text-ink">&lt;</span>
              <input
                autoFocus
                inputMode="decimal"
                aria-label="Target harian kWh"
                value={draftTarget}
                onChange={(e) => setDraftTarget(e.target.value)}
                onBlur={commitTarget}
                className="w-12 rounded border border-primary/40 px-1 py-0.5 text-xs font-bold text-ink outline-none"
              />
              <span className="text-[11px] font-normal text-slate-400">/hari</span>
            </form>
          ) : (
            <div
              onClick={() => {
                setDraftTarget(String(targetKwh));
                setEditingTarget(true);
              }}
              className="flex cursor-pointer items-center gap-2"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setDraftTarget(String(targetKwh));
                  setEditingTarget(true);
                }
              }}
            >
              <span className="text-sm font-bold text-ink">
                &lt; {targetKwh}kWh <span className="text-xs font-normal text-slate-400">/hari</span>
              </span>
              <Pencil className="size-3 text-slate-400 hover:text-primary" aria-hidden />
            </div>
          )}
        </div>
      </div>

      {/* Kartu Status Tegangan */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-3.5 py-2 text-left shadow-2xs transition-all hover:border-slate-300">
        <div className="grid size-9 place-items-center rounded-xl bg-cyan-50 text-teal-600">
          <Plug className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            STATUS TEGANGAN
          </span>
          <CustomSelect
            value={VOLTAGE_STATUSES[voltageIndex]}
            onChange={(val) => {
              const idx = VOLTAGE_STATUSES.indexOf(val as (typeof VOLTAGE_STATUSES)[number]);
              if (idx >= 0) setVoltageIndex(idx);
            }}
            options={VOLTAGE_STATUSES.map((status) => ({
              value: status,
              label: status,
            }))}
            variant="chip"
            dropdownClassName="w-44 -left-8"
            ariaLabel="Status Tegangan"
          />
        </div>
      </div>
    </div>
  );
}
