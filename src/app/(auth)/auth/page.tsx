import type { Metadata } from "next";
import { AuthPage as AuthView } from "@/components/landing/auth-page";

export const metadata: Metadata = { title: "Masuk & Daftar — EcoKos" };

export default function AuthPage() {
  return <AuthView initialMode="auth" />;
}
