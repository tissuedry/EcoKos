import { ArrowDownRight, Award, Cpu, Plug, TrendingDown, Wallet, Zap, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";

interface KpiCardProps {
  icon: LucideIcon;
  iconClass: string;
  badge: ReactNode;
  label: string;
  value: string;
  unit: string;
  valueClass?: string;
  children: ReactNode;
}

function KpiCard({ icon: Icon, iconClass, badge, label, value, unit, valueClass, children }: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between">
        <span className={cn("grid size-10 place-items-center rounded-xl", iconClass)}>
          <Icon className="size-[18px]" aria-hidden />
        </span>
        {badge}
      </div>
      <div>
        <p className="text-xs font-semibold text-ink-muted">{label}</p>
        <p className="flex items-baseline gap-1.5">
          <span className={cn("text-[32px] leading-10 font-bold tracking-tight", valueClass)}>{value}</span>
          <span className="text-[13px] text-ink-muted">{unit}</span>
        </p>
      </div>
      <div className="mt-auto">{children}</div>
    </Card>
  );
}

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={Zap}
        iconClass="bg-mint text-primary"
        badge={<Badge icon={<TrendingDown className="size-3" />}>Hemat 18%</Badge>}
        label="Listrik Minggu Ini"
        value="14.2"
        unit="kWh"
      >
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="font-bold text-ink-muted">Target &lt; 20 kWh</span>
            <span className="font-semibold text-primary">71% Kuota</span>
          </div>
          <ProgressBar value={71} label="Kuota listrik minggu ini" />
        </div>
      </KpiCard>

      <KpiCard
        icon={Cpu}
        iconClass="bg-cyan text-teal"
        badge={<Badge tone="neutral" className="bg-surface-highest text-teal">Stabil 220V</Badge>}
        label="Daya Beban Rata-rata"
        value="145"
        unit="Watt / jam"
      >
        <div className="flex items-center justify-between text-[11px] font-bold text-ink-muted">
          <span className="flex items-center gap-1"><Plug className="size-3" aria-hidden />Standby 38W</span>
          <span className="flex items-center gap-1"><Zap className="size-3" aria-hidden />Aktif 107W</span>
          <span className="font-semibold text-primary">Efisien</span>
        </div>
      </KpiCard>

      <KpiCard
        icon={Wallet}
        iconClass="bg-peach text-amber"
        badge={<Badge>-Rp 8.500</Badge>}
        label="Estimasi Biaya Listrik"
        value="Rp 21.300"
        unit="/ minggu"
        valueClass="text-[22px] leading-7"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink-muted">
          <ArrowDownRight className="size-3.5 text-primary" aria-hidden />
          Lebih hemat vs rata-rata kosan
        </p>
      </KpiCard>

      <KpiCard
        icon={Award}
        iconClass="bg-primary text-white"
        badge={<Badge tone="peach">Top 5 Kos 🏆</Badge>}
        label="Eco-Score Anak Kos"
        value="88"
        unit="/ 100"
        valueClass="text-primary"
      >
        <div>
          <p className="text-[11px] font-semibold">Pejuang Lingkungan Kampus</p>
          <p className="text-[13px] text-ink-muted">Badge aktif periode aktif</p>
        </div>
      </KpiCard>
    </div>
  );
}
