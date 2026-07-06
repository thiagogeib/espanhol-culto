import { useState } from "react";
import { speak, type SpeechRate } from "../lib/useTTS";

interface SpeakButtonProps {
  text: string;
}

export function SpeakButton({ text }: SpeakButtonProps) {
  const [loadingRate, setLoadingRate] = useState<SpeechRate | null>(null);

  async function handleSpeak(rate: SpeechRate) {
    setLoadingRate(rate);
    await speak(text, rate);
    setLoadingRate(null);
  }

  return (
    <div className="speak-buttons">
      <button
        type="button"
        className="speak-btn"
        onClick={() => handleSpeak("normal")}
        disabled={loadingRate !== null}
        aria-label={`Ouvir "${text}" em ritmo normal`}
      >
        {loadingRate === "normal" ? "…" : "▶"}
      </button>
      <button
        type="button"
        className="speak-btn speak-btn--lento"
        onClick={() => handleSpeak("lento")}
        disabled={loadingRate !== null}
        aria-label={`Ouvir "${text}" devagar`}
      >
        {loadingRate === "lento" ? "…" : "▶ lento"}
      </button>
    </div>
  );
}
