import { CheckpointStatus, HistoryEntry, RunState } from "./types";
import { ROUTES } from "./data/routes";

export const STORAGE_KEY = "routebound-state-v1";

export const defaultRunState: RunState = {
  runName: "Northbound Ledger",
  activeRouteId: ROUTES[0].id,
  checkpointStatus: {},
  routeHistory: [],
  breachNotes: [],
  history: [],
  strictMode: true
};

export function createHistory(title: string, detail: string): HistoryEntry {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    title,
    detail
  };
}

export function loadRunState(): RunState {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return defaultRunState;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultRunState;
    const parsed = JSON.parse(raw) as Partial<RunState>;
    return {
      ...defaultRunState,
      ...parsed,
      checkpointStatus: parsed.checkpointStatus || {},
      routeHistory: Array.isArray(parsed.routeHistory) ? parsed.routeHistory : [],
      breachNotes: Array.isArray(parsed.breachNotes) ? parsed.breachNotes : [],
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch {
    return defaultRunState;
  }
}

export function saveRunState(state: RunState): void {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be blocked in strict privacy modes; the app should still run.
  }
}

export function nextCheckpointStatus(current: CheckpointStatus): CheckpointStatus {
  if (current === "pending") return "reached";
  if (current === "reached") return "cleared";
  return "pending";
}
