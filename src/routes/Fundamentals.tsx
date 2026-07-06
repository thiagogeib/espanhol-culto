import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MultipleChoiceExerciseView } from "../components/exercises/MultipleChoiceExerciseView";
import { SoundRuleCard } from "../components/SoundRuleCard";
import { SpeechRateToggle } from "../components/SpeechRateToggle";
import { fundamentalsQuiz, soundRules } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";
import { saveLastVisited } from "../lib/progress";

const MODULE_ID = "fundamentos";

export function Fundamentals() {
  const { progress, complete } = useProgress();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    saveLastVisited({ moduleId: MODULE_ID });
  }, []);

  const moduleProgress = progress[MODULE_ID] ?? {};

  function handleMarkAsRead() {
    complete(MODULE_ID, "letra");
  }

  function handleAnswered(correct: boolean) {
    setAnsweredCount((count) => {
      const next = count + 1;
      if (next >= fundamentalsQuiz.length) {
        complete(MODULE_ID, "exercicios");
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

  const quizFinished = answeredCount >= fundamentalsQuiz.length;

  return (
    <div className="module-page">
      <h1>🗣️ Módulo 0 — Fundamentos de pronúncia</h1>
      <p className="module-page__resumo">
        Antes de entrar nas músicas, vamos afinar o ouvido para os sons que
        mais diferenciam o espanhol do português. Todos os exemplos abaixo
        vêm das próprias músicas que você canta no culto.
      </p>

      <section className="module-section">
        <SpeechRateToggle>
          <div className="sound-rules">
            {soundRules.map((rule) => (
              <SoundRuleCard rule={rule} key={rule.titulo} />
            ))}
          </div>
        </SpeechRateToggle>
        {!moduleProgress.letra ? (
          <button type="button" className="mark-complete-btn" onClick={handleMarkAsRead}>
            Marcar leitura como concluída
          </button>
        ) : (
          <p className="module-section__done">✓ Leitura concluída</p>
        )}
      </section>

      <section className="module-section">
        <h2>Quiz rápido</h2>
        {quizFinished ? (
          <div className="module-section__result">
            <p className="module-section__done">
              ✓ Quiz concluído — {correctCount}/{fundamentalsQuiz.length} corretas
            </p>
            <button type="button" className="practice-again-btn" onClick={handlePracticeAgain}>
              🔄 Praticar novamente
            </button>
          </div>
        ) : null}
        <div className="exercise-list">
          {fundamentalsQuiz.map((question, index) => (
            <MultipleChoiceExerciseView
              exercise={question}
              onAnswered={handleAnswered}
              key={`fundamentos-${index}-${attempt}`}
            />
          ))}
        </div>
      </section>

      <nav className="module-nav">
        <span />
        <Link to="/" className="module-nav__btn module-nav__btn--primary">
          🏠 Voltar aos módulos
        </Link>
      </nav>
    </div>
  );
}
