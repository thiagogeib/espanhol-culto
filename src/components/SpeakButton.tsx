import { useState } from "react";
import { speak } from "../lib/useTTS";
import { useSpeechRate } from "./SpeechRateToggle";

interface SpeakButtonProps {
  text: string;
}

export function SpeakButton({ text }: SpeakButtonProps) {
  const rate = useSpeechRate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSpeak() {
    setIsLoading(true);
    await speak(text, rate);
    setIsLoading(false);
  }

  return (
    <button
      type="button"
      className={`speak-btn${isLoading ? " speak-btn--loading" : ""}`}
      onClick={() => void handleSpeak()}
      disabled={isLoading}
      aria-label={rate === "lento" ? `Ouvir "${text}" devagar` : `Ouvir "${text}"`}
    >
      {isLoading ? <span className="speak-btn__spinner" aria-hidden="true" /> : "▶"}
    </button>
  );
}
