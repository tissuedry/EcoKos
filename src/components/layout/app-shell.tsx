"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { useSession } from "@/hooks/use-session";
import { clearSession } from "@/lib/session";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

/** Skor dummy; nanti berasal dari API. */
const ECO_SCORE = 84;

/** Membungkus halaman terautentikasi: guard sesi, sidebar, dan header. */
export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, ready } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (ready && !session) router.replace("/auth");
  }, [ready, session, router]);

  if (!ready || !session) {
    return <div className="grid min-h-screen place-items-center text-sm text-ink-muted">Memuat EcoKos…</div>;
  }

  const handleLogout = () => {
    clearSession();
    router.replace("/auth");
  };

  return (
    <ToastProvider>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:block">
        <Sidebar session={session} ecoScore={ECO_SCORE} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Tutup menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 shadow-float">
            <Sidebar session={session} ecoScore={ECO_SCORE} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <Header session={session} ecoScore={ECO_SCORE} onOpenMenu={() => setDrawerOpen(true)} onLogout={handleLogout} />

      <main className="min-h-screen bg-canvas px-4 pt-16 pb-10 sm:px-6 lg:pl-[calc(18rem+2rem)] lg:pr-8">
        <div className="w-full">{children}</div>
      </main>
    </ToastProvider>
  );
}
