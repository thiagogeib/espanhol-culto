import { useState } from "react";
import type { MultipleChoiceContent } from "../../data/songs";

interface MultipleChoiceExerciseViewProps {
  exercise: MultipleChoiceContent;
  onAnswered: (correct: boolean) => void;
}

export function MultipleChoiceExerciseView({
  exercise,
  onAnswered,
}: MultipleChoiceExerciseViewProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    onAnswered(index === exercise.respostaIndex);
  }

  return (
    <div className="exercise-card">
      <p className="exercise-card__question">{exercise.pergunta}</p>
      <div className="exercise-card__options">
        {exercise.opcoes.map((opcao, index) => {
          const isSelected = selected === index;
          const isCorrect = index === exercise.respostaIndex;
          const showState = selected !== null;
          const className = [
            "exercise-option",
            showState && isCorrect ? "exercise-option--correct" : "",
            showState && isSelected && !isCorrect ? "exercise-option--wrong" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={opcao}
              type="button"
              className={className}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
            >
              {opcao}
            </button>
          );
        })}
      </div>
    </div>
  );
}
