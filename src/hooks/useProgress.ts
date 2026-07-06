import { useCallback, useState } from "react";
import {
  computeModulePercent,
  loadProgress,
  markSectionComplete,
  type ProgressState,
  type SectionKey,
} from "../lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  const complete = useCallback((moduleId: string, section: SectionKey) => {
    setProgress(markSectionComplete(moduleId, section));
  }, []);

  const percentFor = useCallback(
    (moduleId: string, totalSections: number) =>
      computeModulePercent(progress, moduleId, totalSections),
    [progress],
  );

  return { progress, complete, percentFor };
}
