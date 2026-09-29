import type { Metadata } from "next";
import { AuthPage } from "@/components/landing/auth-page";

export const metadata: Metadata = {
  title: "EcoKos — Smart Living Mahasiswa Mandiri",
  description: "Solusi pintar mahasiswa kos modern untuk pantau kWh kamar realtime dan hemat listrik.",
};

export default function HomePage() {
  return <AuthPage initialMode="landing" />;
}
