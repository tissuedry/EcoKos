"use client";

import { useState } from "react";
import { LogForm } from "@/components/pencatatan/log-form";
import { LogTable } from "@/components/pencatatan/log-table";
import { PageChips } from "@/components/pencatatan/page-chips";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { DAILY_TARGET_KWH } from "@/data/pencatatan";
import { useElectricityLogs } from "@/hooks/use-electricity-logs";
import type { ElectricityLog } from "@/types";

export default function PencatatanPage() {
  const toast = useToast();
  const { logs, addLog, updateLog, removeLog } = useElectricityLogs();
  const [editing, setEditing] = useState<ElectricityLog | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ElectricityLog | null>(null);
  const [targetKwh, setTargetKwh] = useState(DAILY_TARGET_KWH);

  const handleSubmit = (values: Omit<ElectricityLog, "id" | "timestamp">) => {
    if (editing) {
      updateLog(editing.id, values);
      setEditing(null);
      toast.show("Log berhasil diperbarui");
      return;
    }
    addLog({ ...values, id: crypto.randomUUID(), timestamp: new Date().toISOString() });
    toast.show("Log listrik tersimpan");
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    removeLog(pendingDelete.id);
    if (editing?.id === pendingDelete.id) setEditing(null);
    setPendingDelete(null);
    toast.show("Log dihapus");
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-lg flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold tracking-wider text-primary border border-emerald-200/60 uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Smart Logging Hub
            </span>
            <span className="text-xs font-medium text-ink-muted">• Siklus 24 Oktober 2025</span>
          </div>
          <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-ink">
            Pencatatan &amp; Audit Energi Listrik Kamar
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            Input telemetri dan durasi beban elektronik kamar untuk audit konsumsi daya harian secara real-time.
          </p>
        </div>
        <PageChips targetKwh={targetKwh} onTargetChange={setTargetKwh} />
      </header>

      <LogForm key={editing?.id ?? "new"} editing={editing} onSubmit={handleSubmit} onCancelEdit={() => setEditing(null)} />
      <LogTable
        logs={logs}
        onEdit={(log) => {
          setEditing(log);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onDelete={setPendingDelete}
      />

      <Modal open={pendingDelete !== null} title="Hapus log ini?" onClose={() => setPendingDelete(null)}>
        <p className="text-sm text-ink-muted">
          Catatan <b className="text-ink">{pendingDelete?.title}</b> akan dihapus dari riwayat.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setPendingDelete(null)}>Batal</Button>
          <Button className="bg-danger hover:bg-danger/90" onClick={confirmDelete}>Hapus</Button>
        </div>
      </Modal>
    </div>
  );
}
