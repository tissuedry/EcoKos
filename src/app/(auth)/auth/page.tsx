import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { BrandPanel } from "@/components/auth/brand-panel";

export const metadata: Metadata = { title: "Masuk & Daftar — EcoKos" };

export default function AuthPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-canvas p-4 sm:p-8">
      <div className="relative grid w-full max-w-[1280px] overflow-hidden rounded-3xl border border-line/30 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:min-h-[720px] lg:grid-cols-12">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-mint/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-cyan/20 blur-3xl" />
        <BrandPanel />
        <AuthForm />
      </div>
    </main>
  );
}
