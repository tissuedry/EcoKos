"use client";

import { useCallback, useState } from "react";
import { INITIAL_LOGS } from "@/data/pencatatan";
import type { ElectricityLog } from "@/types";

/** State log listrik di memori. Ganti isi hook ini dengan pemanggilan API saat backend siap. */
export function useElectricityLogs() {
  const [logs, setLogs] = useState<ElectricityLog[]>(INITIAL_LOGS);

  const addLog = useCallback((log: ElectricityLog) => setLogs((current) => [log, ...current]), []);

  const updateLog = useCallback(
    (id: string, changes: Partial<Omit<ElectricityLog, "id">>) =>
      setLogs((current) => current.map((log) => (log.id === id ? { ...log, ...changes } : log))),
    [],
  );

  const removeLog = useCallback((id: string) => setLogs((current) => current.filter((log) => log.id !== id)), []);

  return { logs, addLog, updateLog, removeLog };
}
