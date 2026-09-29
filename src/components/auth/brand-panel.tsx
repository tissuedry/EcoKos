import { BellRing, Building2, Trophy, Zap, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Transparansi kWh Listrik",
    description: "Pantau grafik harian konsumsi daya sebelum ibu kos tagih denda token mendadak.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: BellRing,
    title: "Peringatan Kuota Token & Beban Daya",
    description: "Notifikasi otomatis sebelum kuota token listrik kamar menipis atau tagihan melonjak.",
    tone: "bg-teal/10 text-teal",
  },
  {
    icon: Trophy,
    title: "Leaderboard & Reward Kamar",
    description: "Ajak teman kamar sebelah kompetisi adu hemat energi dengan hadiah voucher seru.",
    tone: "bg-amber/10 text-amber",
  },
];

export function BrandPanel() {
  return (
    <div className="flex flex-col gap-8 bg-gradient-to-br from-surface-low via-white to-surface-low/50 p-8 lg:col-span-5 lg:border-r lg:border-line/40 lg:p-12">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoMark size="lg" />
          <div>
            <p className="text-2xl leading-8 font-bold tracking-tight text-ink">EcoKos</p>
            <p className="text-xs font-medium text-ink-muted">Smart Living Mahasiswa Mandiri</p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-surface-high/80 px-3 py-1.5 text-xs font-semibold text-ink-muted sm:inline-flex">
          <span className="size-2 rounded-full bg-emerald" />
          50+ Kos Aktif
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold tracking-wider text-primary uppercase">
            <Building2 className="size-3" aria-hidden />
            Gerbang Masuk Mahasiswa
          </span>
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">• Awal Alur EcoKos</span>
        </div>
        <h1 className="text-[34px] leading-[42px] font-bold tracking-tight text-ink">
          Hemat Listrik, Jaga Bumi, Dompet Tetap Aman.
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Solusi pintar mahasiswa kos modern untuk pantau kWh kamar realtime, hindari lonjakan tagihan tak
          terduga, dan kendalikan beban listrik bersama teman sekosan.
        </p>
      </div>

      <ul className="hidden flex-col gap-3 md:flex">
        {FEATURES.map(({ icon: Icon, title, description, tone }) => (
          <li key={title} className="flex items-start gap-3.5 rounded-2xl border border-line/30 bg-white p-4 shadow-card">
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="text-xs leading-snug text-ink-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
