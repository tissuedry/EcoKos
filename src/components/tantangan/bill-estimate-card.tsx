import { CalendarClock, Leaf, ShieldCheck, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BILL } from "@/data/tantangan";
import { formatRupiah } from "@/lib/format";

export function BillEstimateCard() {
  const usedPercent = (BILL.current / BILL.limit) * 100;
  const remaining = BILL.limit - BILL.current;

  return (
    <Card className="flex flex-col gap-4 overflow-hidden lg:col-span-7">
      <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/5 blur-2xl" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Receipt className="size-[18px] text-primary" aria-hidden />
            Estimasi Real-Time Tagihan Kamar 204
          </h2>
          <Badge dot className="w-fit">Mode Hemat Maksimal</Badge>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2 pt-1">
          <div>
            <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">Total Pemakaian Berjalan</p>
            <p className="flex items-baseline gap-1">
              <span className="text-[40px] leading-[48px] font-bold tracking-tight text-primary">{formatRupiah(BILL.current)}</span>
              <span className="text-sm text-ink-muted">/ batas {formatRupiah(BILL.limit)}</span>
            </p>
          </div>
          <span className="rounded-lg bg-surface-mid px-2 py-1 text-xs">
            <b className="text-primary">{usedPercent.toFixed(1)}%</b> kuota aman
          </span>
        </div>

        <div className="space-y-1.5">
          <ProgressBar value={usedPercent} height="lg" barClassName="bg-gradient-to-r from-primary to-emerald" label="Pemakaian terhadap batas tagihan" />
          <div className="flex justify-between text-[11px] font-bold text-ink-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3" aria-hidden />
              Tersisa kuota hemat: <b className="text-ink">{formatRupiah(remaining)}</b>
            </span>
            <span>Pagu Kos: {BILL.paguKwh} kWh</span>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl bg-mint/40 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-card">
            <Leaf className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-[#002113]">Kamar Anda Sangat Hemat!</p>
            <p className="text-[13px] leading-snug text-on-mint">
              Tren pemakaian stabil di bawah 80%. Anda berhak atas diskon iuran kos sebesar{" "}
              <b className="text-primary">{formatRupiah(BILL.rewardDiscount)}</b> pada pelunasan tagihan akhir bulan ini.
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
          <CalendarClock className="size-3" aria-hidden />
          Siklus tagihan berakhir dalam {BILL.daysLeft} hari.
        </p>
      </div>
    </Card>
  );
}
