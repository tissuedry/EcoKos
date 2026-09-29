import type { Metadata } from "next";
import { MorphingAuthPage } from "@/components/landing/morphing-auth-page";

export const metadata: Metadata = {
  title: "EcoKos — Smart Living Mahasiswa Mandiri",
  description: "Solusi pintar mahasiswa kos modern untuk pantau kWh kamar realtime dan hemat listrik.",
};

export default function HomePage() {
  return <MorphingAuthPage initialMode="landing" />;
}
