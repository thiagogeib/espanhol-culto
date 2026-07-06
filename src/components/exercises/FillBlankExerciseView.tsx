import { useState } from "react";
import type { FillBlankExercise } from "../../data/songs";

interface FillBlankExerciseViewProps {
  exercise: FillBlankExercise;
  onAnswered: (correct: boolean) => void;
}

export function FillBlankExerciseView({
  exercise,
  onAnswered,
}: FillBlankExerciseViewProps) {
  const [chosen, setChosen] = useState<string | null>(null);

  function handleChoose(word: string) {
    if (chosen !== null) return;
    setChosen(word);
    onAnswered(word === exercise.resposta);
  }

  const parts = exercise.frase.split("___");
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";

  return (
    <div className="exercise-card">
      <p className="exercise-card__sentence">
        {before}
        <span className="exercise-card__blank">{chosen ?? "___"}</span>
        {after}
      </p>
      <div className="exercise-card__options">
        {exercise.bancoPalavras.map((word) => {
          const isChosen = chosen === word;
          const isCorrect = word === exercise.resposta;
          const showState = chosen !== null;
          const className = [
            "exercise-option",
            showState && isCorrect ? "exercise-option--correct" : "",
            showState && isChosen && !isCorrect ? "exercise-option--wrong" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={word}
              type="button"
              className={className}
              onClick={() => handleChoose(word)}
              disabled={chosen !== null}
            >
              {word}
            </button>
          );
        })}
      </div>
      {chosen !== null ? (
        <p className="exercise-card__translation">{exercise.traducao}</p>
      ) : null}
    </div>
  );
}
