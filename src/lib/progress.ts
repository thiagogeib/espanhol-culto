import { supabase } from "./supabase";

export type SectionKey =
  | "vocabulario"
  | "letra"
  | "gramatica"
  | "exercicios"
  | "karaoke";

export type ModuleProgress = Partial<Record<SectionKey, boolean>>;
export type ProgressState = Record<string, ModuleProgress>;

interface ProgressRow {
  module_id: string;
  progress: ModuleProgress;
}

export async function fetchRemoteProgress(userId: string): Promise<ProgressState> {
  const { data, error } = await supabase
    .from("espanhol_progress")
    .select("module_id, progress")
    .eq("learner_id", userId);

  if (error || !data) return {};

  const state: ProgressState = {};
  for (const row of data as ProgressRow[]) {
    state[row.module_id] = row.progress;
  }
  return state;
}

export async function upsertRemoteProgress(
  userId: string,
  moduleId: string,
  moduleProgress: ModuleProgress,
): Promise<void> {
  try {
    await supabase.from("espanhol_progress").upsert({
      learner_id: userId,
      module_id: moduleId,
      progress: moduleProgress,
      atualizado_em: new Date().toISOString(),
    });
  } catch {
    // fire-and-forget — falha de rede não deve travar a UI
  }
}

export async function clearRemoteProgress(userId: string): Promise<void> {
  try {
    await supabase.from("espanhol_progress").delete().eq("learner_id", userId);
  } catch {
    // fire-and-forget
  }
}

export function computeModulePercent(
  progress: ProgressState,
  moduleId: string,
  totalSections: number,
): number {
  const moduleProgress = progress[moduleId];
  if (!moduleProgress) return 0;
  const done = Object.values(moduleProgress).filter(Boolean).length;
  if (totalSections === 0) return 0;
  return Math.round((done / totalSections) * 100);
}

export interface LastVisited {
  moduleId: string;
  section?: SectionKey;
}

const LAST_VISITED_KEY = "espanhol-culto:last-visited";

export function saveLastVisited(entry: LastVisited): void {
  try {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(entry));
  } catch {
    // quota indisponível — ignora, não é crítico
  }
}

export function loadLastVisited(): LastVisited | null {
  try {
    const raw = localStorage.getItem(LAST_VISITED_KEY);
    return raw ? (JSON.parse(raw) as LastVisited) : null;
  } catch {
    return null;
  }
}
