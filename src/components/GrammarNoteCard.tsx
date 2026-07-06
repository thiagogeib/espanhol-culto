import type { GrammarNote } from "../data/songs";

interface GrammarNoteCardProps {
  note: GrammarNote;
}

export function GrammarNoteCard({ note }: GrammarNoteCardProps) {
  return (
    <div className="grammar-card">
      <h3 className="grammar-card__titulo">{note.titulo}</h3>
      <p className="grammar-card__explicacao">{note.explicacao}</p>
      <ul className="grammar-card__exemplos">
        {note.exemplos.map((exemplo) => (
          <li key={exemplo.es}>
            <span className="grammar-card__es">{exemplo.es}</span>
            <span className="grammar-card__pt">{exemplo.pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
