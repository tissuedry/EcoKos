export interface UserSession {
  name: string;
  username: string;
  email?: string;
  kos: string;
  room: string;
  quotaKwh: number;
}

export type LogCategory = "Pendingin" | "Dapur Kos" | "Gadget & Lampu" | "Beban Berat";

export interface Appliance {
  id: string;
  name: string;
  category: LogCategory;
  powerKw: number;
}

export interface ElectricityLog {
  id: string;
  timestamp: string;
  applianceId: string;
  category: LogCategory;
  title: string;
  description: string;
  kwh: number;
  hours: number;
  range: string;
}
