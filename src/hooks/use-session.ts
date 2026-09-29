"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseSession, readRawSession, subscribeSession } from "@/lib/session";
import type { UserSession } from "@/types";

const subscribeNoop = () => () => {};

export function useSession(): { session: UserSession | null; ready: boolean } {
  const raw = useSyncExternalStore(subscribeSession, readRawSession, () => "");
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const session = useMemo(() => parseSession(raw), [raw]);
  return { session, ready };
}
