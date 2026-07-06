import { useRef, useState } from "react";
import type { LyricLine } from "../data/songs";
import { speak, stopSpeaking } from "../lib/useTTS";
import { SpeechRateToggle, useSpeechRate } from "./SpeechRateToggle";

interface KaraokeProps {
  linhas: LyricLine[];
}

export function Karaoke({ linhas }: KaraokeProps) {
  return (
    <SpeechRateToggle>
      <KaraokeInner linhas={linhas} />
    </SpeechRateToggle>
  );
}

function KaraokeInner({ linhas }: KaraokeProps) {
  const rate = useSpeechRate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const stopRequested = useRef(false);

  async function playFrom(startIndex: number) {
    stopRequested.current = false;
    for (let i = startIndex; i < linhas.length; i += 1) {
      if (stopRequested.current) break;
      const line = linhas[i];
      if (!line) continue;
      setActiveIndex(i);
      await speak(line.es, rate);
    }
    setActiveIndex(null);
  }

  function stop() {
    stopRequested.current = true;
    stopSpeaking();
    setActiveIndex(null);
  }

  return (
    <div className="karaoke">
      <div className="karaoke__controls">
        <button type="button" onClick={() => void playFrom(0)} disabled={activeIndex !== null}>
          ▶ Cantar junto
        </button>
        <button type="button" onClick={stop} disabled={activeIndex === null}>
          ■ Parar
        </button>
        <label className="karaoke__toggle">
          <input
            type="checkbox"
            checked={showTranslation}
            onChange={(event) => setShowTranslation(event.target.checked)}
          />
          Mostrar tradução
        </label>
      </div>
      {activeIndex !== null ? (
        <p className="karaoke__progress">
          Linha {activeIndex + 1} de {linhas.length}
        </p>
      ) : (
        <p className="karaoke__hint">Toque em qualquer linha pra começar a cantar a partir dela</p>
      )}
      <div className="karaoke__lines">
        {linhas.map((line, index) => (
          <button
            type="button"
            key={line.es}
            className={`karaoke__line${activeIndex === index ? " karaoke__line--active" : ""}`}
            onClick={() => void playFrom(index)}
            disabled={activeIndex !== null}
          >
            <span className="karaoke__es">{line.es}</span>
            {showTranslation ? <span className="karaoke__pt">{line.pt}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
