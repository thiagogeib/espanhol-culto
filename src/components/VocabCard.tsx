import type { VocabItem } from "../data/songs";
import { SpeakButton } from "./SpeakButton";

interface VocabCardProps {
  item: VocabItem;
}

export function VocabCard({ item }: VocabCardProps) {
  return (
    <div className="vocab-card">
      <div className="vocab-card__header">
        <span className="vocab-card__es">{item.es}</span>
        <SpeakButton text={item.es} />
      </div>
      <div className="vocab-card__pt">{item.pt}</div>
      {item.nota ? <div className="vocab-card__nota">{item.nota}</div> : null}
    </div>
  );
}
