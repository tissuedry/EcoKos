import type { Appliance, ElectricityLog, LogCategory } from "@/types";

/** Tarif PLN R-1 dan faktor emisi jaringan listrik (dummy). */
export const TARIFF_PER_KWH = 1_444;
export const EMISSION_KG_PER_KWH = 0.8;
export const DAILY_TARGET_KWH = 3.5;

export const APPLIANCES: Appliance[] = [
  { id: "ac", name: "AC Kamar (0.5 PK)", category: "Pendingin", powerKw: 0.35 },
  { id: "fridge", name: "Kulkas Mini Kamar", category: "Pendingin", powerKw: 0.0354 },
  { id: "rice", name: "Rice Cooker Memasak", category: "Dapur Kos", powerKw: 0.47 },
  { id: "laptop", name: "Laptop & Monitor Skripsi", category: "Gadget & Lampu", powerKw: 0.08 },
  { id: "fan", name: "Kipas Angin Dinding", category: "Gadget & Lampu", powerKw: 0.05 },
  { id: "iron", name: "Setrika Pakaian Mingguan", category: "Beban Berat", powerKw: 0.3 },
];

export const TIME_RANGES = [
  "Pagi (06:00 - 11:00)",
  "Siang (11:00 - 15:00)",
  "Sore (15:00 - 18:00)",
  "Malam (18:00 - 23:00)",
  "Dini Hari (23:00 - 06:00)",
] as const;

export const CATEGORY_FILTERS: Array<"Semua Peralatan Listrik" | LogCategory> = [
  "Semua Peralatan Listrik",
  "Pendingin",
  "Dapur Kos",
  "Gadget & Lampu",
  "Beban Berat",
];

export const DATE_FILTERS = ["Minggu Ini", "Bulan Ini", "Semua Waktu"] as const;

export const VOLTAGE_STATUSES = ["Stabil 220V", "Naik 235V", "Turun 200V"] as const;

/** Log awal yang persis mengikuti desain. */
const SEED_LOGS: ElectricityLog[] = [
  { id: "l1", timestamp: "2025-10-24T14:30:00", applianceId: "ac", category: "Pendingin", title: "AC Kamar (0.5 PK)", description: "Mode hemat 25°C • Durasi 4 jam", kwh: 1.4, hours: 4, range: "Pagi (06:00 - 11:00)" },
  { id: "l2", timestamp: "2025-10-24T08:00:00", applianceId: "fridge", category: "Pendingin", title: "Kulkas Mini Kamar", description: "Standby kompresor siklus 24 jam", kwh: 0.85, hours: 24, range: "Dini Hari (23:00 - 06:00)" },
  { id: "l3", timestamp: "2025-10-23T18:40:00", applianceId: "rice", category: "Dapur Kos", title: "Rice Cooker Memasak", description: "Siklus masak nasi 45 menit", kwh: 0.35, hours: 0.75, range: "Malam (18:00 - 23:00)" },
  { id: "l4", timestamp: "2025-10-23T13:10:00", applianceId: "laptop", category: "Gadget & Lampu", title: "Laptop & Monitor Skripsi", description: "Aktivitas riset tugas akhir (5.5 jam)", kwh: 0.44, hours: 5.5, range: "Siang (11:00 - 15:00)" },
  { id: "l5", timestamp: "2025-10-22T07:00:00", applianceId: "fan", category: "Gadget & Lampu", title: "Kipas Angin Dinding", description: "Semalaman (8 jam waktu tidur)", kwh: 0.4, hours: 8, range: "Dini Hari (23:00 - 06:00)" },
  { id: "l6", timestamp: "2025-10-22T19:20:00", applianceId: "iron", category: "Beban Berat", title: "Setrika Pakaian Mingguan", description: "Penyetrikaan pakaian kuliah (1.5 jam)", kwh: 0.45, hours: 1.5, range: "Malam (18:00 - 23:00)" },
];

/** Melengkapi data dummy hingga 28 catatan secara deterministik. */
function buildFillerLogs(count: number): ElectricityLog[] {
  return Array.from({ length: count }, (_, index) => {
    const appliance = APPLIANCES[index % APPLIANCES.length];
    const day = 21 - Math.floor(index / 2);
    const hour = 7 + ((index * 3) % 14);
    const hours = 1 + (index % 4);
    const date = new Date(2025, 9, Math.max(day, 1), hour, (index * 7) % 60);
    return {
      id: `f${index}`,
      timestamp: date.toISOString(),
      applianceId: appliance.id,
      category: appliance.category,
      title: appliance.name,
      description: `Pemakaian rutin • Durasi ${hours} jam`,
      kwh: Number((appliance.powerKw * hours).toFixed(2)),
      hours,
      range: TIME_RANGES[index % TIME_RANGES.length],
    };
  });
}

export const INITIAL_LOGS: ElectricityLog[] = [...SEED_LOGS, ...buildFillerLogs(22)];
