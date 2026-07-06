import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { GrammarNoteCard } from "../components/GrammarNoteCard";
import { Karaoke } from "../components/Karaoke";
import { LyricLineRow } from "../components/LyricLineRow";
import { SpeechRateToggle } from "../components/SpeechRateToggle";
import { VocabCard } from "../components/VocabCard";
import { FillBlankExerciseView } from "../components/exercises/FillBlankExerciseView";
import { MultipleChoiceExerciseView } from "../components/exercises/MultipleChoiceExerciseView";
import { getSongById, type Song } from "../data/songs";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import type { SectionKey } from "../lib/progress";
import { saveLastVisited } from "../lib/progress";

const TABS: { key: SectionKey; label: string; icone: string }[] = [
  { key: "vocabulario", label: "Vocabulário", icone: "📖" },
  { key: "letra", label: "Letra", icone: "🎤" },
  { key: "gramatica", label: "Gramática", icone: "📝" },
  { key: "exercicios", label: "Exercícios", icone: "✏️" },
  { key: "karaoke", label: "Karaokê", icone: "🎶" },
];

function isSectionKey(value: string | null): value is SectionKey {
  return TABS.some((tab) => tab.key === value);
}

export function SongModule() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const song = id ? getSongById(id) : undefined;
  const { user } = useAuth();
  const { progress, complete } = useProgress(user?.id);
  const initialTab = searchParams.get("aba");
  const [activeTab, setActiveTab] = useState<SectionKey>(
    isSectionKey(initialTab) ? initialTab : "vocabulario",
  );
  const [showTranslation, setShowTranslation] = useState(true);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempt, setAttempt] = useState(0);

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
    saveLastVisited({ moduleId: currentSong.id, section: tab });
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

  function handlePracticeAgain() {
    setAnsweredCount(0);
    setCorrectCount(0);
    setAttempt((value) => value + 1);
  }

  const exercisesFinished = answeredCount >= song.exercicios.length;
  const currentIndex = TABS.findIndex((tab) => tab.key === activeTab);
  const prevTab = TABS[currentIndex - 1];
  const nextTab = TABS[currentIndex + 1];

  return (
    <div className="module-page">
      <h1>
        {song.icone} {song.titulo}
      </h1>
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
            {tab.icone} {tab.label}
            {moduleProgress[tab.key] ? " ✓" : ""}
          </button>
        ))}
      </nav>

      {activeTab === "vocabulario" ? (
        <SpeechRateToggle>
          <section className="module-section vocab-grid">
            {song.vocabulario.map((item) => (
              <VocabCard item={item} key={item.es} />
            ))}
          </section>
        </SpeechRateToggle>
      ) : null}

      {activeTab === "letra" ? (
        <SpeechRateToggle>
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
        </SpeechRateToggle>
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
            <div className="module-section__result">
              <p className="module-section__done">
                ✓ Exercícios concluídos — {correctCount}/{song.exercicios.length} corretas
              </p>
              <button type="button" className="practice-again-btn" onClick={handlePracticeAgain}>
                🔄 Praticar novamente
              </button>
            </div>
          ) : null}
          <div className="exercise-list">
            {song.exercicios.map((exercise, index) =>
              exercise.tipo === "multipla-escolha" ? (
                <MultipleChoiceExerciseView
                  exercise={exercise}
                  onAnswered={(correct) => handleAnswered(song, correct)}
                  key={`${song.id}-ex-${index}-${attempt}`}
                />
              ) : (
                <FillBlankExerciseView
                  exercise={exercise}
                  onAnswered={(correct) => handleAnswered(song, correct)}
                  key={`${song.id}-ex-${index}-${attempt}`}
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

      <nav className="module-nav">
        {prevTab ? (
          <button type="button" className="module-nav__btn" onClick={() => handleTabClick(song, prevTab.key)}>
            ◀ {prevTab.icone} {prevTab.label}
          </button>
        ) : (
          <span />
        )}
        {nextTab ? (
          <button
            type="button"
            className="module-nav__btn module-nav__btn--primary"
            onClick={() => handleTabClick(song, nextTab.key)}
          >
            {nextTab.icone} {nextTab.label} ▶
          </button>
        ) : (
          <Link to="/" className="module-nav__btn module-nav__btn--primary">
            🏠 Voltar aos módulos
          </Link>
        )}
      </nav>
    </div>
  );
}
