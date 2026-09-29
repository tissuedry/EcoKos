"use client";

import { Pencil, Zap } from "lucide-react";
import { useState } from "react";
import { VOLTAGE_STATUSES } from "@/data/pencatatan";

const chipClass =
  "flex items-center gap-2 rounded-xl bg-surface-low px-4 py-2 text-[11px] font-bold text-ink-muted transition-colors hover:bg-surface-mid";

interface PageChipsProps {
  targetKwh: number;
  onTargetChange: (value: number) => void;
}

/** Dua chip yang bisa diubah: target harian dan status tegangan. */
export function PageChips({ targetKwh, onTargetChange }: PageChipsProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(targetKwh));
  const [voltageIndex, setVoltageIndex] = useState(0);

  const commit = () => {
    const value = Number(draft.replace(",", "."));
    if (Number.isFinite(value) && value > 0) onTargetChange(Number(value.toFixed(1)));
    setEditing(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {editing ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            commit();
          }}
          className={chipClass}
        >
          <span className="size-2 rounded-full bg-primary" />
          Target Listrik: &lt;
          <input
            autoFocus
            inputMode="decimal"
            aria-label="Target listrik kWh per hari"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            className="w-12 rounded-md bg-white px-1.5 py-0.5 text-ink outline-none focus:ring-2 focus:ring-primary/30"
          />
          kWh/hari
        </form>
      ) : (
        <button
          type="button"
          className={chipClass}
          onClick={() => {
            setDraft(String(targetKwh));
            setEditing(true);
          }}
        >
          <span className="size-2 rounded-full bg-primary" />
          <span>
            Target Listrik: <b className="font-semibold text-ink">&lt; {targetKwh} kWh/hari</b>
          </span>
          <Pencil className="size-3" aria-hidden />
        </button>
      )}

      <button
        type="button"
        className={chipClass}
        onClick={() => setVoltageIndex((index) => (index + 1) % VOLTAGE_STATUSES.length)}
      >
        <Zap className="size-3" aria-hidden />
        <span>
          Status Tegangan: <b className="font-semibold text-ink">{VOLTAGE_STATUSES[voltageIndex]}</b>
        </span>
        <Pencil className="size-3" aria-hidden />
      </button>
    </div>
  );
}
