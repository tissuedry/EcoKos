"use client";

import { CheckCircle2, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

export function EcoTipCard() {
  const toast = useToast();
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setDone(true);
    toast.show("+10 Poin Eco-Score ditambahkan!");
  };

  return (
    <Card className="flex flex-col justify-between gap-6 overflow-hidden lg:col-span-7">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-primary">
          <Lightbulb className="size-6" aria-hidden />
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-mint px-3 py-0.5 text-[11px] font-semibold text-on-mint">Eco-Tip Cerdas</span>
            <span className="text-[11px] font-bold text-ink-muted">Prioritas Pagi</span>
          </div>
          <h3 className="text-lg leading-6 font-bold">Cegah Kebocoran Daya Sebelum Berangkat Kuliah</h3>
          <p className="text-sm leading-[22px] text-ink-muted">
            Matikan saklar stop kontak laptop dan charger yang tertancap saat Anda meninggalkan kamar kos.
            Langkah kecil ini menghemat ~<b>0.4 kWh</b> per hari!
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <span className="flex items-center gap-2 text-[11px] font-bold text-ink-muted">
          <span className="size-2 rounded-full bg-emerald" />
          Reward: +10 Poin Eco-Score
        </span>
        <Button onClick={handleDone} disabled={done}>
          <CheckCircle2 className="size-4" aria-hidden />
          {done ? "Tercatat (+10 Poin)" : "Sudah Dilakukan (+10 Poin)"}
        </Button>
      </div>
    </Card>
  );
}
