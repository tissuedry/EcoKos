import type { Metadata } from "next";
import { MorphingAuthPage } from "@/components/landing/morphing-auth-page";

export const metadata: Metadata = { title: "Masuk & Daftar — EcoKos" };

export default function AuthPage() {
  return <MorphingAuthPage initialMode="auth" />;
}
