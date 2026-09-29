"use client";

import { QrCode, Share2, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

const SHARE_URL = "https://ecokos.example/kos/griya-mahasiswa";

export function CommunityBanner() {
  const toast = useToast();
  const [qrOpen, setQrOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast.show("Tautan kos disalin ke clipboard");
    } catch {
      toast.show("Salin manual: " + SHARE_URL);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-teal p-6 shadow-float">
        <div aria-hidden className="absolute -right-12 -bottom-12 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6 text-white">
          <div className="flex max-w-2xl items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Users className="size-7" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase">Komunitas Kosan</span>
                <span className="text-[11px] font-bold text-mint">Kamar Sebelah &amp; Ibu Kos</span>
              </div>
              <h2 className="text-[22px] leading-7 font-bold tracking-tight">Undang Teman Sebelah Kamar atau Pemilik Kos</h2>
              <p className="text-sm leading-[22px] text-white/90">
                Semakin banyak penghuni kos yang memantau tagihan transparan, semakin besar peluang seluruh kosan
                mendapatkan potongan tarif iuran bersama, bonus token listrik kos, dan instalasi smart meter cerdas
                dari EcoKos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="soft" size="lg" onClick={handleShare}>
              <Share2 className="size-4" aria-hidden />
              Bagikan Tautan Kos
            </Button>
            <Button variant="glass" size="lg" onClick={() => setQrOpen(true)}>
              <QrCode className="size-4" aria-hidden />
              QR Code Kamar
            </Button>
          </div>
        </div>
      </section>

      <Modal open={qrOpen} title="QR Code Kamar 204" onClose={() => setQrOpen(false)}>
        <div className="flex flex-col items-center gap-3">
          <div className="grid size-48 place-items-center rounded-2xl border-2 border-dashed border-line bg-surface-low">
            <QrCode className="size-24 text-primary" aria-hidden />
          </div>
          <p className="text-center text-xs text-ink-muted">
            Placeholder QR. Kode sungguhan akan dibuat oleh backend untuk mengundang penghuni kos lain.
          </p>
        </div>
      </Modal>
    </>
  );
}
