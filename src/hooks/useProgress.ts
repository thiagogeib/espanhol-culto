import { useCallback, useEffect, useState } from "react";
import {
  clearRemoteProgress,
  computeModulePercent,
  fetchRemoteProgress,
  upsertRemoteProgress,
  type ProgressState,
  type SectionKey,
} from "../lib/progress";

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<ProgressState>({});

  useEffect(() => {
    if (!userId) {
      setProgress({});
      return;
    }
    let cancelled = false;
    fetchRemoteProgress(userId).then((state) => {
      if (!cancelled) setProgress(state);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const complete = useCallback(
    (moduleId: string, section: SectionKey) => {
      if (!userId) return;
      setProgress((prev) => {
        const moduleProgress = { ...(prev[moduleId] ?? {}), [section]: true };
        void upsertRemoteProgress(userId, moduleId, moduleProgress);
        return { ...prev, [moduleId]: moduleProgress };
      });
    },
    [userId],
  );

  const percentFor = useCallback(
    (moduleId: string, totalSections: number) =>
      computeModulePercent(progress, moduleId, totalSections),
    [progress],
  );

  const reset = useCallback(async () => {
    if (!userId) return;
    await clearRemoteProgress(userId);
    setProgress({});
  }, [userId]);

  return { progress, complete, percentFor, reset };
}
