"use client";

import { Activity, Award, CalendarPlus, Gauge, PlugZap, Trophy } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useToast } from "@/components/ui/toast";
import { INITIAL_MISSIONS, type Mission } from "@/data/tantangan";

export function MissionsCard() {
  const toast = useToast();
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [claimed, setClaimed] = useState<string[]>([]);

  const addDay = (id: string) =>
    setMissions((current) =>
      current.map((mission) =>
        mission.id === id ? { ...mission, progress: Math.min(mission.goal, mission.progress + 1) } : mission,
      ),
    );

  const claim = (mission: Mission) => {
    setClaimed((current) => [...current, mission.id]);
    toast.show(`Badge '${mission.badge}' berhasil diklaim!`);
  };

  return (
    <Card className="flex flex-col gap-4 lg:col-span-5">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Trophy className="size-[18px] text-amber" aria-hidden />
          Misi Mingguan Anak Kos
        </h2>
        <Badge className="w-fit text-primary">+50 Eco Score</Badge>
      </div>

      <ul className="flex flex-col gap-2">
        {missions.map((mission) => {
          const isStandby = mission.id === "standby";
          const targetReached = mission.progress >= mission.target;
          return (
            <li key={mission.id} className="flex flex-col gap-2 rounded-xl bg-surface-low p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${isStandby ? "bg-mint text-primary" : "bg-cyan-soft text-teal"}`}>
                    {isStandby ? <PlugZap className="size-4" aria-hidden /> : <Gauge className="size-4" aria-hidden />}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{mission.title}</p>
                    <p className="text-[11px] text-ink-muted">{mission.reward}</p>
                  </div>
                </div>
                {targetReached ? (
                  <Badge>Selesai!</Badge>
                ) : (
                  <Badge tone="neutral">{mission.daysLeft} Hari Sisa</Badge>
                )}
              </div>

              <div className="flex justify-between pt-1 text-[11px] font-bold">
                <span className="text-ink-muted">Progres Misi</span>
                <span className={targetReached ? "text-primary" : ""}>
                  {mission.progress} / {mission.goal} Hari{isStandby && targetReached ? " (Tercapai Target)" : ""}
                </span>
              </div>
              <ProgressBar
                value={(mission.progress / mission.goal) * 100}
                barClassName={isStandby ? "bg-primary" : "bg-cyan"}
                label={`Progres ${mission.title}`}
              />

              {isStandby ? (
                <Button
                  size="sm"
                  className="mt-1 w-full"
                  disabled={claimed.includes(mission.id)}
                  onClick={() => claim(mission)}
                >
                  <Award className="size-4" aria-hidden />
                  {claimed.includes(mission.id) ? "Badge Sudah Diklaim" : "Klaim Badge 'Night Saver'"}
                </Button>
              ) : (
                <div className="mt-1 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    rounded="xl"
                    className="flex-1 text-[11px]"
                    disabled={mission.progress >= mission.goal}
                    onClick={() => addDay(mission.id)}
                  >
                    <CalendarPlus className="size-3.5" aria-hidden />
                    +1 Hari Hemat &lt; 2 kWh
                  </Button>
                  <a
                    href="#breakdown"
                    className="flex items-center gap-1 rounded-xl bg-cyan-soft px-2 py-1.5 text-[11px] font-bold text-on-cyan hover:bg-cyan/50"
                  >
                    <Activity className="size-3" aria-hidden />
                    Cek Beban
                  </a>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
