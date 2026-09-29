import type { UserSession } from "@/types";

/**
 * Sesi palsu berbasis localStorage — hanya untuk demo frontend.
 * Ganti dengan auth sungguhan saat backend tersedia.
 */
const STORAGE_KEY = "ecokos.session";
const listeners = new Set<() => void>();

export function subscribeSession(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** Mengembalikan string mentah agar snapshot stabil bagi useSyncExternalStore. */
export function readRawSession(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function parseSession(raw: string): UserSession | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export function saveSession(session: UserSession): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* storage tidak tersedia; sesi hanya berlaku untuk tab ini */
  }
  listeners.forEach((listener) => listener());
}

export function clearSession(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* abaikan */
  }
  listeners.forEach((listener) => listener());
}
