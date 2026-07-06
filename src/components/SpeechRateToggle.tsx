import { createContext, useContext, useState, type ReactNode } from "react";
import type { SpeechRate } from "../lib/useTTS";

const SpeechRateContext = createContext<SpeechRate>("normal");

export function useSpeechRate(): SpeechRate {
  return useContext(SpeechRateContext);
}

interface SpeechRateToggleProps {
  children: ReactNode;
}

/** Fornece a velocidade de fala compartilhada por todos os SpeakButton dentro dela. */
export function SpeechRateToggle({ children }: SpeechRateToggleProps) {
  const [rate, setRate] = useState<SpeechRate>("normal");

  return (
    <SpeechRateContext.Provider value={rate}>
      <div className="speech-rate-toggle">
        <button
          type="button"
          className={`speech-rate-toggle__btn${rate === "normal" ? " speech-rate-toggle__btn--active" : ""}`}
          onClick={() => setRate("normal")}
        >
          ▶ Ritmo normal
        </button>
        <button
          type="button"
          className={`speech-rate-toggle__btn${rate === "lento" ? " speech-rate-toggle__btn--active" : ""}`}
          onClick={() => setRate("lento")}
        >
          🐢 Devagar
        </button>
      </div>
      {children}
    </SpeechRateContext.Provider>
  );
}
