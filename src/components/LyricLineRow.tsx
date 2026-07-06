import type { LyricLine } from "../data/songs";
import { SpeakButton } from "./SpeakButton";

interface LyricLineRowProps {
  line: LyricLine;
  showTranslation: boolean;
  isActive?: boolean;
}

export function LyricLineRow({ line, showTranslation, isActive }: LyricLineRowProps) {
  return (
    <div className={`lyric-line${isActive ? " lyric-line--active" : ""}`}>
      <div className="lyric-line__es">
        <SpeakButton text={line.es} />
        <span>{line.es}</span>
      </div>
      {showTranslation ? <div className="lyric-line__pt">{line.pt}</div> : null}
    </div>
  );
}
