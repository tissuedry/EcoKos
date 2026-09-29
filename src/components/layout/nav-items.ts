import { LayoutDashboard, Trophy, Zap, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pencatatan", label: "Catat & Log Beban Listrik", icon: Zap },
  { href: "/tantangan", label: "Tantangan & Tagihan Kos", icon: Trophy },
];
