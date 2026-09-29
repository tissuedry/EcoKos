"use client";

import { EcoTipCard } from "@/components/dashboard/eco-tip-card";
import { GreetingBar } from "@/components/dashboard/greeting-bar";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LoadDonut } from "@/components/dashboard/load-donut";
import { QuickLogCard } from "@/components/dashboard/quick-log-card";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { useSession } from "@/hooks/use-session";

export default function DashboardPage() {
  const { session } = useSession();
  if (!session) return null;

  return (
    <div className="flex flex-col gap-6 pt-6">
      <GreetingBar name={session.name} room={session.room} kos={session.kos} />
      <KpiCards />
      <div className="grid gap-6 lg:grid-cols-12">
        <UsageChart />
        <LoadDonut />
        <EcoTipCard />
        <QuickLogCard />
      </div>
    </div>
  );
}
