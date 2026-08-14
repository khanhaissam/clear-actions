import { generateSampleActions, type ActionItem } from "@/lib/data";

export const STORAGE_KEY = "actiontrack.actions.v1";

export function loadActions(): ActionItem[] {
  if (typeof window === "undefined") return generateSampleActions();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return generateSampleActions();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return generateSampleActions();
    return parsed as ActionItem[];
  } catch {
    return generateSampleActions();
  }
}

export function saveActions(actions: ActionItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  } catch {
    /* storage unavailable — ignore */
  }
}
