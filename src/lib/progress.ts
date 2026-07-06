export type SectionKey =
  | "vocabulario"
  | "letra"
  | "gramatica"
  | "exercicios"
  | "karaoke";

export type ModuleProgress = Partial<Record<SectionKey, boolean>>;
export type ProgressState = Record<string, ModuleProgress>;

const STORAGE_KEY = "espanhol-culto:progress";

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota indisponível — progresso simplesmente não persiste nesta sessão
  }
}

export function markSectionComplete(
  moduleId: string,
  section: SectionKey,
): ProgressState {
  const state = loadProgress();
  const moduleProgress = state[moduleId] ?? {};
  const next: ProgressState = {
    ...state,
    [moduleId]: { ...moduleProgress, [section]: true },
  };
  saveProgress(next);
  return next;
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
