import type { UserSession } from "@/types";

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
    const data = JSON.parse(raw);
    return {
      ...data,
      username:
        data.username ||
        data.email?.split("@")[0] ||
        data.name?.toLowerCase().replace(/\s+/g, "_") ||
        "anak_kos",
    } as UserSession;
  } catch {
    return null;
  }
}

export function saveSession(session: UserSession): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
  }
  listeners.forEach((listener) => listener());
}

export function clearSession(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
  }
  listeners.forEach((listener) => listener());
}
