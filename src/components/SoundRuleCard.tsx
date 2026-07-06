import type { SoundRule } from "../data/curriculum";
import { SpeakButton } from "./SpeakButton";

interface SoundRuleCardProps {
  rule: SoundRule;
}

export function SoundRuleCard({ rule }: SoundRuleCardProps) {
  return (
    <div className="sound-rule-card">
      <span className="sound-rule-card__tag">{rule.som}</span>
      <h3 className="sound-rule-card__titulo">{rule.titulo}</h3>
      <p className="sound-rule-card__explicacao">{rule.explicacao}</p>
      <div className="sound-rule-card__exemplos">
        {rule.exemplos.map((exemplo) => (
          <div className="sound-rule-card__exemplo" key={exemplo.palavra}>
            <SpeakButton text={exemplo.palavra} />
            <span className="sound-rule-card__palavra">{exemplo.palavra}</span>
            <span className="sound-rule-card__musica">{exemplo.musica}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
