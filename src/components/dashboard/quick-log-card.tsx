import { ChevronRight, Plug, Snowflake } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const SHORTCUTS = [
  { label: "+ Catat Pemakaian AC / Kipas", hint: "Durasi pendingin siang, suhu 24°C", icon: Snowflake, tone: "bg-cyan-soft text-on-cyan" },
  { label: "+ Catat Peralatan Listrik", hint: "Log rice cooker, setrika, charger", icon: Plug, tone: "bg-mint text-on-mint" },
];

export function QuickLogCard() {
  return (
    <Card className="flex flex-col gap-4 lg:col-span-5">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Log Cepat Hari Ini</h3>
          <span className="text-[11px] font-semibold text-primary">2 Aksi Siap Catat</span>
        </div>
        <p className="text-[13px] text-ink-muted">
          Catat pemakaian secara rutin untuk mempertahankan posisi Top 5 Kosan Hijau.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {SHORTCUTS.map(({ label, hint, icon: Icon, tone }) => (
          <Link
            key={label}
            href="/pencatatan"
            className="flex items-center justify-between gap-2 rounded-xl bg-surface-low p-4 transition-colors hover:bg-surface-mid"
          >
            <span className="flex items-center gap-2">
              <span className={`grid size-10 place-items-center rounded-full ${tone}`}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block text-[13px] text-ink-muted">{hint}</span>
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-ink-muted" aria-hidden />
          </Link>
        ))}
      </div>
    </Card>
  );
}
