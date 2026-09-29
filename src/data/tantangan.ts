import type { LucideIcon } from "lucide-react";
import { Laptop, Lightbulb, Refrigerator, Fan } from "lucide-react";

export const BILL = {
  current: 94_500,
  limit: 120_000,
  paguKwh: 100,
  daysLeft: 14,
  rewardDiscount: 15_000,
};

export interface SmartPlug {
  id: string;
  name: string;
  icon: LucideIcon;
  percent: number;
  kwh: number;
  cost: number;
  usage: string;
  accent: string;
  bar: string;
}

export const SMART_PLUGS: SmartPlug[] = [
  { id: "fridge", name: "Kulkas Mini Kos", icon: Refrigerator, percent: 38, kwh: 35.9, cost: 35_910, usage: "Aktif 24 Jam / Hari", accent: "text-primary", bar: "bg-primary" },
  { id: "fan", name: "Kipas Angin Berdiri", icon: Fan, percent: 26, kwh: 24.5, cost: 24_570, usage: "Rata-rata 9.5 Jam / Hari", accent: "text-teal", bar: "bg-teal" },
  { id: "laptop", name: "Laptop & Monitor", icon: Laptop, percent: 22, kwh: 20.7, cost: 20_790, usage: "Rata-rata 6.2 Jam / Hari", accent: "text-ink", bar: "bg-emerald" },
  { id: "light", name: "Lampu & Charger HP", icon: Lightbulb, percent: 14, kwh: 13.4, cost: 13_230, usage: "Rata-rata 5 Jam / Hari", accent: "text-ink", bar: "bg-amber" },
];

export const DAILY_TELEMETRY = [
  { day: "Senin", short: "Sen", kwh: 2.3 },
  { day: "Selasa", short: "Sel", kwh: 2.0 },
  { day: "Rabu", short: "Rab", kwh: 2.5 },
  { day: "Kamis", short: "Kam", kwh: 2.1 },
  { day: "Jumat", short: "Jum", kwh: 2.8 },
  { day: "Sabtu", short: "Sab", kwh: 1.6 },
  { day: "Minggu (Hari Ini)", short: "Min", kwh: 1.8 },
];

export const SIMULATOR = {
  maxHours: 8,
  defaultHours: 2,
  /** Rp per bulan yang dihemat untuk setiap jam kipas dikurangi. */
  savingPerHour: 6_000,
};

export interface Mission {
  id: string;
  title: string;
  reward: string;
  /** Jumlah hari pada bar progres. */
  goal: number;
  /** Hari minimal agar target dianggap tercapai. */
  target: number;
  progress: number;
  daysLeft?: number;
  badge?: string;
}

export const INITIAL_MISSIONS: Mission[] = [
  { id: "limit", title: "Batas Konsumsi < 2 kWh/Hari", reward: "Hadiah: Voucher Token Listrik Rp 20k", goal: 7, target: 7, progress: 5, daysLeft: 2 },
  { id: "standby", title: "Zero Standby: Cabut Colokan", reward: "Badge: 'Night Saver' Spesial", goal: 7, target: 6, progress: 6, badge: "Night Saver" },
];
