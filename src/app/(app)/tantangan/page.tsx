import { CalendarClock, Gift, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { ApplianceBreakdown } from "@/components/tantangan/appliance-breakdown";
import { BillEstimateCard } from "@/components/tantangan/bill-estimate-card";
import { CommunityBanner } from "@/components/tantangan/community-banner";
import { MissionsCard } from "@/components/tantangan/missions-card";
import { SavingsSimulator } from "@/components/tantangan/savings-simulator";
import { BILL } from "@/data/tantangan";
import { formatRupiah } from "@/lib/format";

export const metadata: Metadata = { title: "Tantangan Hijau — EcoKos" };

function Chip({ icon: Icon, children, tone }: { icon?: LucideIcon; children: string; tone: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[11px] font-semibold ${tone}`}>
      {Icon && <Icon className="size-3" aria-hidden />}
      {children}
    </span>
  );
}

export default function TantanganPage() {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-3xl flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="bg-mint text-on-mint uppercase tracking-wider font-bold">Kompetisi &amp; Finansial Kosan</Chip>
            <Chip icon={CalendarClock} tone="bg-cyan-soft text-on-cyan">{`Siklus Tagihan: ${BILL.daysLeft} Hari Tersisa`}</Chip>
          </div>
          <h1 className="text-[32px] leading-10 font-bold tracking-tight">Tantangan Hijau &amp; Transparansi Biaya Listrik</h1>
          <p className="text-base text-ink-muted">
            Komparasi pengeluaran listrik kamar dan serunya adu hemat energi antar sesama anak kos dalam satu atap.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-2 shadow-card">
          <span className="grid h-12 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Gift className="size-6" aria-hidden />
          </span>
          <div className="pr-4">
            <p className="text-[11px] font-bold text-ink-muted">Target Reward Kos</p>
            <p className="text-lg leading-6 font-bold text-primary">Diskon {formatRupiah(BILL.rewardDiscount)}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <BillEstimateCard />
        <MissionsCard />
      </div>
      <ApplianceBreakdown />
      <SavingsSimulator />
      <CommunityBanner />
    </div>
  );
}
