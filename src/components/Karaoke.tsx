import { useRef, useState } from "react";
import type { LyricLine } from "../data/songs";
import { speak, stopSpeaking } from "../lib/useTTS";

interface KaraokeProps {
  linhas: LyricLine[];
}

export function Karaoke({ linhas }: KaraokeProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const stopRequested = useRef(false);

  async function playAll() {
    stopRequested.current = false;
    for (let i = 0; i < linhas.length; i += 1) {
      if (stopRequested.current) break;
      const line = linhas[i];
      if (!line) continue;
      setActiveIndex(i);
      await speak(line.es, "normal");
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
        <button type="button" onClick={() => void playAll()} disabled={activeIndex !== null}>
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
      <div className="karaoke__lines">
        {linhas.map((line, index) => (
          <div
            key={line.es}
            className={`karaoke__line${activeIndex === index ? " karaoke__line--active" : ""}`}
          >
            <p className="karaoke__es">{line.es}</p>
            {showTranslation ? <p className="karaoke__pt">{line.pt}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
