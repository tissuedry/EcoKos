export interface UserSession {
  name: string;
  email: string;
  kos: string;
  room: string;
  quotaKwh: number;
}

export type LogCategory = "Pendingin" | "Dapur Kos" | "Gadget & Lampu" | "Beban Berat";

export interface Appliance {
  id: string;
  name: string;
  category: LogCategory;
  /** Daya rata-rata dalam kW, dipakai untuk estimasi. */
  powerKw: number;
}

export interface ElectricityLog {
  id: string;
  /** ISO datetime */
  timestamp: string;
  applianceId: string;
  category: LogCategory;
  title: string;
  description: string;
  kwh: number;
  /** Durasi pemakaian dalam jam (dipakai saat edit). */
  hours: number;
  /** Rentang waktu pemakaian (dipakai saat edit). */
  range: string;
}
