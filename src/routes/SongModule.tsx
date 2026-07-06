import { useState } from "react";
import { useParams } from "react-router-dom";
import { GrammarNoteCard } from "../components/GrammarNoteCard";
import { Karaoke } from "../components/Karaoke";
import { LyricLineRow } from "../components/LyricLineRow";
import { VocabCard } from "../components/VocabCard";
import { FillBlankExerciseView } from "../components/exercises/FillBlankExerciseView";
import { MultipleChoiceExerciseView } from "../components/exercises/MultipleChoiceExerciseView";
import { getSongById, type Song } from "../data/songs";
import { useProgress } from "../hooks/useProgress";
import type { SectionKey } from "../lib/progress";

const TABS: { key: SectionKey; label: string }[] = [
  { key: "vocabulario", label: "Vocabulário" },
  { key: "letra", label: "Letra" },
  { key: "gramatica", label: "Gramática" },
  { key: "exercicios", label: "Exercícios" },
  { key: "karaoke", label: "Karaokê" },
];

export function SongModule() {
  const { id } = useParams<{ id: string }>();
  const song = id ? getSongById(id) : undefined;
  const { progress, complete } = useProgress();
  const [activeTab, setActiveTab] = useState<SectionKey>("vocabulario");
  const [showTranslation, setShowTranslation] = useState(true);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (!song) {
    return (
      <div className="module-page">
        <p>Música não encontrada.</p>
      </div>
    );
  }

  const moduleProgress = progress[song.id] ?? {};

  function handleTabClick(currentSong: Song, tab: SectionKey) {
    setActiveTab(tab);
    if (tab !== "exercicios") {
      complete(currentSong.id, tab);
    }
  }

  function handleAnswered(currentSong: Song, correct: boolean) {
    setAnsweredCount((count) => {
      const next = count + 1;
      if (next >= currentSong.exercicios.length) {
        complete(currentSong.id, "exercicios");
      }
      return next;
    });
    if (correct) setCorrectCount((count) => count + 1);
  }

  const exercisesFinished = answeredCount >= song.exercicios.length;

  return (
    <div className="module-page">
      <h1>{song.titulo}</h1>
      <p className="module-page__artista">{song.artista}</p>
      <p className="module-page__resumo">{song.resumo}</p>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tabs__btn${activeTab === tab.key ? " tabs__btn--active" : ""}`}
            onClick={() => handleTabClick(song, tab.key)}
          >
            {tab.label}
            {moduleProgress[tab.key] ? " ✓" : ""}
          </button>
        ))}
      </nav>

      {activeTab === "vocabulario" ? (
        <section className="module-section vocab-grid">
          {song.vocabulario.map((item) => (
            <VocabCard item={item} key={item.es} />
          ))}
        </section>
      ) : null}

      {activeTab === "letra" ? (
        <section className="module-section">
          <label className="lyrics-toggle">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={(event) => setShowTranslation(event.target.checked)}
            />
            Mostrar tradução
          </label>
          <div className="lyrics">
            {song.linhas.map((line) => (
              <LyricLineRow line={line} showTranslation={showTranslation} key={line.es} />
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "gramatica" ? (
        <section className="module-section">
          {song.gramatica.map((note) => (
            <GrammarNoteCard note={note} key={note.titulo} />
          ))}
        </section>
      ) : null}

      {activeTab === "exercicios" ? (
        <section className="module-section">
          {exercisesFinished ? (
            <p className="module-section__done">
              ✓ Exercícios concluídos — {correctCount}/{song.exercicios.length} corretas
            </p>
          ) : null}
          <div className="exercise-list">
            {song.exercicios.map((exercise, index) =>
              exercise.tipo === "multipla-escolha" ? (
                <MultipleChoiceExerciseView
                  exercise={exercise}
                  onAnswered={(correct) => handleAnswered(song, correct)}
                  key={`${song.id}-ex-${index}`}
                />
              ) : (
                <FillBlankExerciseView
                  exercise={exercise}
                  onAnswered={(correct) => handleAnswered(song, correct)}
                  key={`${song.id}-ex-${index}`}
                />
              ),
            )}
          </div>
        </section>
      ) : null}

      {activeTab === "karaoke" ? (
        <section className="module-section">
          <Karaoke linhas={song.linhas} />
        </section>
      ) : null}
    </div>
  );
}
