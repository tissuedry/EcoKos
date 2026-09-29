"use client";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

interface AuthPageProps {
  initialMode?: "landing" | "auth";
}

const FEATURE_CARDS = [
  {
    icon: Zap,
    title: "Transparansi kWh Listrik",
    description: "Pantau grafik harian konsumsi daya sebelum ibu kos tagih denda token mendadak.",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Calculator,
    title: "Estimasi Biaya Listrik",
    description: "Hitung perkiraan pengeluaran token harian dan bulanan secara akurat agar dompet tetap aman.",
    iconBg: "bg-cyan-50 text-teal-600",
  },
  {
    icon: Award,
    title: "Leaderboard & Reward Kamar",
    description: "Ajak teman kamar sebelah kompetisi adu hemat energi dengan hadiah voucher seru.",
    iconBg: "bg-amber-50 text-amber-600",
  },
];

export function AuthPage({ initialMode = "landing" }: AuthPageProps) {
  const [isAuth, setIsAuth] = useState(initialMode === "auth");

  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const cardsPrevRect = useRef<DOMRect | null>(null);
  const headerPrevRect = useRef<DOMRect | null>(null);
  const headlinePrevRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    setIsAuth(initialMode === "auth");
  }, [initialMode]);

  const toggleAuth = (toAuth: boolean) => {
    if (cardsRef.current) cardsPrevRect.current = cardsRef.current.getBoundingClientRect();
    if (headerRef.current) headerPrevRect.current = headerRef.current.getBoundingClientRect();
    if (headlineRef.current) headlinePrevRect.current = headlineRef.current.getBoundingClientRect();
    setIsAuth(toAuth);
  };

  useLayoutEffect(() => {
    const items = [
      { ref: headerRef, prev: headerPrevRect, withScale: true },
      { ref: headlineRef, prev: headlinePrevRect, withScale: true },
      { ref: cardsRef, prev: cardsPrevRect, withScale: false },
    ];

    const activeAnimations: Array<{
      el: HTMLElement;
      dx: number;
      dy: number;
      scaleX: number;
      scaleY: number;
    }> = [];

    for (const item of items) {
      if (!item.prev.current || !item.ref.current) continue;
      const prev = item.prev.current;
      const current = item.ref.current.getBoundingClientRect();
      item.prev.current = null;

      const dx = prev.left - current.left;
      const dy = prev.top - current.top;

      let scaleX = 1;
      let scaleY = 1;
      if (item.withScale && current.width > 0 && current.height > 0) {
        scaleX = prev.width / current.width;
        scaleY = prev.height / current.height;

        if (Math.abs(scaleX - scaleY) > 0.15) {
          scaleY = scaleX;
        }
      }

      const hasChange =
        Math.abs(dx) > 1 ||
        Math.abs(dy) > 1 ||
        Math.abs(scaleX - 1) > 0.01 ||
        Math.abs(scaleY - 1) > 0.01;

      if (hasChange) {
        activeAnimations.push({
          el: item.ref.current,
          dx,
          dy,
          scaleX,
          scaleY,
        });
      }
    }

    if (activeAnimations.length === 0) return;

    for (const { el, dx, dy, scaleX, scaleY } of activeAnimations) {
      el.style.transformOrigin = "top left";
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scaleX}, ${scaleY})`;
      el.style.transition = "none";
    }

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        for (const { el } of activeAnimations) {
          el.style.transition = "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.transform = "translate3d(0, 0, 0) scale(1, 1)";
        }
      });
    });

    const cleanupTimeout = setTimeout(() => {
      for (const { el } of activeAnimations) {
        el.style.transition = "";
        el.style.transform = "";
        el.style.transformOrigin = "";
      }
    }, 750);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(cleanupTimeout);
    };
  }, [isAuth]);

  const renderFeatureCards = () => (
    <div ref={cardsRef} className="w-full relative z-20 will-change-transform">
      <ul className="flex flex-col gap-3.5 w-full">
        {FEATURE_CARDS.map(({ icon: Icon, title, description, iconBg }) => (
          <li
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
          >
            <div className={cn("grid size-11 place-items-center rounded-xl shrink-0", iconBg)}>
              <Icon className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">{title}</h2>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-canvas p-4 sm:p-6 lg:p-8">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-mint/25 blur-3xl transition-transform duration-1000 ease-out",
          isAuth ? "translate-x-8 translate-y-8 scale-110" : "translate-x-0 translate-y-0 scale-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-cyan/20 blur-3xl transition-transform duration-1000 ease-out",
          isAuth ? "-translate-x-8 -translate-y-8 scale-110" : "translate-x-0 translate-y-0 scale-100",
        )}
      />

      <div
        className={cn(
          "relative flex flex-col w-full max-w-[1280px] overflow-hidden rounded-3xl border border-line/30 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isAuth ? "lg:min-h-[720px]" : "lg:min-h-[660px]",
        )}
      >
        {isAuth ? (
          <div className="grid w-full h-full lg:grid-cols-12 flex-1 animate-in fade-in duration-500">
            <div className="flex flex-col justify-between gap-8 bg-gradient-to-br from-surface-low via-white to-surface-low/50 p-8 lg:col-span-5 lg:border-r lg:border-line/40 lg:p-12">
              <div>
                <div className="mb-4 -mt-2">
                  <button
                    type="button"
                    onClick={() => toggleAuth(false)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-xs font-semibold text-ink-muted shadow-2xs hover:bg-slate-50 hover:text-primary transition-all active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Beranda</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div
                    ref={headerRef}
                    className="flex items-center gap-3 relative z-20 will-change-transform"
                  >
                    <LogoMark size="lg" />
                    <div>
                      <p className="text-2xl leading-8 font-bold tracking-tight text-ink">EcoKos</p>
                      <p className="text-xs font-medium text-ink-muted">
                        Smart Living Mahasiswa Mandiri
                      </p>
                    </div>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-surface-high/80 px-3 py-1.5 text-xs font-semibold text-ink-muted sm:inline-flex">
                    <span className="size-2 rounded-full bg-emerald" />
                    50+ Kos Aktif
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold tracking-wider text-primary uppercase">
                    <Building2 className="size-3" aria-hidden />
                    Gerbang Masuk Mahasiswa
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    • Awal Alur EcoKos
                  </span>
                </div>
                <div
                  ref={headlineRef}
                  className="space-y-2 relative z-20 will-change-transform"
                >
                  <h1 className="text-[34px] leading-[42px] font-bold tracking-tight text-ink">
                    Hemat Listrik, Jaga Bumi, Dompet Tetap Aman.
                  </h1>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    Solusi pintar mahasiswa kos modern untuk pantau kWh kamar realtime, hindari lonjakan
                    tagihan tak terduga, dan kendalikan beban listrik bersama teman sekosan.
                  </p>
                </div>
              </div>

              {renderFeatureCards()}
            </div>

            <div className="lg:col-span-7 animate-in fade-in-50 slide-in-from-right-8 duration-600">
              <AuthForm />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full flex-1 justify-between animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-slate-100/90 px-8 py-5 sm:px-12">
              <div
                ref={headerRef}
                className="flex items-center gap-3.5 relative z-20 will-change-transform"
              >
                <LogoMark size="sm" />
                <div>
                  <p className="text-xl font-bold tracking-tight text-ink">EcoKos</p>
                  <p className="text-[11px] font-medium text-ink-muted">
                    Smart Living Mahasiswa Mandiri
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/80 px-4 py-1.5 text-xs font-semibold text-ink-muted shadow-2xs">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  50+ Kos Aktif
                </span>
              </div>
            </div>

            <div className="grid gap-10 px-8 py-10 sm:px-12 lg:grid-cols-12 lg:items-center lg:py-16">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-[11px] font-bold tracking-wider text-primary uppercase shadow-2xs">
                    <Sparkles className="size-3.5 text-emerald-600" aria-hidden />
                    Solusi Gaya Hidup Kos Berkelanjutan
                  </span>
                </div>

                <div
                  ref={headlineRef}
                  className="space-y-3 relative z-20 will-change-transform"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-[44px] lg:leading-[52px] font-extrabold tracking-tight text-ink">
                    Hemat Listrik, Jaga Bumi,{" "}
                    <span className="block text-ink">Dompet Tetap Aman.</span>
                  </h1>
                  <p className="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    Solusi pintar mahasiswa kos modern untuk pantau kWh kamar realtime, hindari lonjakan
                    tagihan tak terduga, dan kendalikan beban listrik bersama teman sekosan.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleAuth(true)}
                    className="group inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:bg-emerald-700 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Hemat listrik</span>
                    <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    <span>Mulai kelola kamar kosmu secara mandiri &amp; hemat tagihan</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3.5 lg:col-span-5">
                {renderFeatureCards()}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-8 py-3.5 text-xs text-ink-muted sm:px-12">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>
                  Platform Smart Living Berkelanjutan Terintegrasi Khusus Komunitas Kos Mahasiswa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <strong className="font-bold text-emerald-600">~32%</strong> Rata-rata Hemat Tagihan
                </span>
                <span className="text-slate-300">•</span>
                <span>
                  <strong className="font-bold text-emerald-600">100%</strong> Realtime &amp; Mandiri
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
