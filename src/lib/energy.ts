import { EMISSION_KG_PER_KWH, TARIFF_PER_KWH } from "@/data/pencatatan";
import type { Appliance } from "@/types";

export interface EnergyEstimate {
  kwh: number;
  cost: number;
  co2: number;
}

/** Estimasi konsumsi, biaya, dan emisi dari daya alat × durasi pemakaian. */
export function estimateEnergy(appliance: Appliance, hours: number): EnergyEstimate {
  const kwh = appliance.powerKw * Math.max(hours, 0);
  return {
    kwh,
    cost: kwh * TARIFF_PER_KWH,
    co2: kwh * EMISSION_KG_PER_KWH,
  };
}

export const costOf = (kwh: number): number => kwh * TARIFF_PER_KWH;
export const co2Of = (kwh: number): number => kwh * EMISSION_KG_PER_KWH;
