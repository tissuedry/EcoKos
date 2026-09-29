"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Filter, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { CATEGORY_FILTERS, DATE_FILTERS } from "@/data/pencatatan";
import { cn } from "@/lib/cn";
import { co2Of, costOf } from "@/lib/energy";
import { formatDate, formatRupiah, formatTime } from "@/lib/format";
import { getPageItems } from "@/lib/pagination";
import { CustomSelect } from "@/components/ui/select";
import type { ElectricityLog } from "@/types";
import { CategoryBadge } from "./category-badge";

const PAGE_SIZE = 6;
const DAY_MS = 86_400_000;

interface LogTableProps {
  logs: ElectricityLog[];
  onEdit: (log: ElectricityLog) => void;
  onDelete: (log: ElectricityLog) => void;
}

export function LogTable({ logs, onEdit, onDelete }: LogTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>(CATEGORY_FILTERS[0]);
  const [period, setPeriod] = useState<(typeof DATE_FILTERS)[number]>("Semua Waktu");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const latest = Math.max(...logs.map((log) => new Date(log.timestamp).getTime()));
    const latestMonth = new Date(latest).getMonth();
    const needle = query.trim().toLowerCase();

    return logs
      .filter((log) => {
        const time = new Date(log.timestamp).getTime();
        if (period === "Minggu Ini" && latest - time > 7 * DAY_MS) return false;
        if (period === "Bulan Ini" && new Date(time).getMonth() !== latestMonth) return false;
        if (category !== CATEGORY_FILTERS[0] && log.category !== category) return false;
        return !needle || `${log.title} ${log.description} ${log.category}`.toLowerCase().includes(needle);
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [logs, query, category, period]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const resetPage = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-lg font-semibold">Riwayat Aktivitas &amp; Log Harian</h2>
          <p className="text-[13px] text-ink-muted">Kelola, edit, atau pantau dampak konsumsi kamar kosmu secara transparan</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-ink-subtle" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => resetPage(setQuery)(event.target.value)}
              placeholder="Cari catatan..."
              aria-label="Cari catatan"
              className="h-10 w-full rounded-full border border-ink-subtle/60 bg-surface-low pr-4 pl-9 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="w-auto min-w-[190px]">
            <CustomSelect
              value={category}
              onChange={(val) => resetPage(setCategory)(val as typeof category)}
              options={CATEGORY_FILTERS.map((item) => ({
                value: item,
                label: item,
              }))}
              variant="filter"
              icon={<Filter className="size-3.5 text-ink-subtle" aria-hidden />}
              rightIcon="chevron"
              dropdownClassName="w-56 right-0"
              ariaLabel="Filter kategori"
            />
          </div>
          <div className="w-auto min-w-[150px]">
            <CustomSelect
              value={period}
              onChange={(val) => resetPage(setPeriod)(val as typeof period)}
              options={DATE_FILTERS.map((item) => ({
                value: item,
                label: item,
              }))}
              variant="filter"
              icon={<CalendarDays className="size-3.5 text-ink-subtle" aria-hidden />}
              rightIcon="chevron"
              dropdownClassName="w-44 right-0"
              ariaLabel="Filter tanggal"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="bg-surface-low/70 text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              <th className="rounded-l-xl px-4 py-3">Tanggal &amp; Waktu</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Item / Deskripsi</th>
              <th className="px-4 py-3">Besaran</th>
              <th className="px-4 py-3">Estimasi Dampak / Biaya</th>
              <th className="rounded-r-xl px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-ink-muted">
                  Tidak ada catatan yang cocok dengan filter.
                </td>
              </tr>
            )}
            {visible.map((log) => (
              <tr key={log.id} className="border-b border-surface-mid last:border-0">
                <td className="px-4 py-4 text-[13px]">
                  <p className="font-semibold">{formatDate(log.timestamp)}</p>
                  <p className="text-ink-muted">{formatTime(log.timestamp)}</p>
                </td>
                <td className="px-4 py-4"><CategoryBadge category={log.category} /></td>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold">{log.title}</p>
                  <p className="max-w-56 text-[13px] text-ink-muted">{log.description}</p>
                </td>
                <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-primary">{log.kwh.toFixed(2)} kWh</td>
                <td className="px-4 py-4">
                  <p className="text-xs font-semibold">{formatRupiah(costOf(log.kwh))}</p>
                  <p className="text-[13px] text-ink-subtle">{co2Of(log.kwh).toFixed(2)} kg CO2e</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(log)}
                      aria-label={`Ubah log ${log.title}`}
                      className="grid size-8 place-items-center rounded-full bg-surface-mid text-ink-muted hover:bg-surface-high hover:text-primary"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(log)}
                      aria-label={`Hapus log ${log.title}`}
                      className="grid size-8 place-items-center rounded-full bg-surface-mid text-ink-muted hover:bg-danger/10 hover:text-danger"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <p className="text-[13px] text-ink-muted">
          Menampilkan{" "}
          <b className="text-ink">{filtered.length === 0 ? 0 : `${start + 1}-${start + visible.length}`}</b> dari{" "}
          <b className="text-ink">{filtered.length}</b> catatan
        </p>
        <nav aria-label="Halaman" className="flex items-center gap-1">
          <PageButton label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            <ChevronLeft className="size-3.5" />
          </PageButton>
          {getPageItems(currentPage, totalPages).map((item, index) =>
            item === "…" ? (
              <span key={`gap-${index}`} className="px-1 text-sm text-line">…</span>
            ) : (
              <PageButton key={item} label={`Halaman ${item}`} active={item === currentPage} onClick={() => setPage(item)}>
                {item}
              </PageButton>
            ),
          )}
          <PageButton label="Halaman berikutnya" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
            <ChevronRight className="size-3.5" />
          </PageButton>
        </nav>
      </div>
    </Card>
  );
}

interface PageButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function PageButton({ label, active, disabled, onClick, children }: PageButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-9 place-items-center rounded-full text-xs font-semibold transition-colors disabled:opacity-40",
        active ? "bg-primary text-white shadow-card" : "bg-surface-low text-ink-muted hover:bg-surface-mid",
      )}
    >
      {children}
    </button>
  );
}
