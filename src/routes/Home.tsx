import { Link } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { curriculumOrder, TOTAL_SECTIONS_FUNDAMENTALS } from "../data/curriculum";
import { TOTAL_SECTIONS_PER_SONG } from "../data/songs";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import { loadLastVisited } from "../lib/progress";

const SONG_MODULE_COUNT = curriculumOrder.filter(
  (entry) => entry.tipo === "musica",
).length;
const TOTAL_SECTIONS_OVERALL =
  TOTAL_SECTIONS_FUNDAMENTALS + SONG_MODULE_COUNT * TOTAL_SECTIONS_PER_SONG;

function totalSectionsFor(tipo: "fundamentos" | "musica"): number {
  return tipo === "fundamentos" ? TOTAL_SECTIONS_FUNDAMENTALS : TOTAL_SECTIONS_PER_SONG;
}

function moduleLinkFor(moduleId: string, tipo: "fundamentos" | "musica", section?: string): string {
  if (tipo === "fundamentos") return "/fundamentos";
  return section ? `/musica/${moduleId}?aba=${section}` : `/musica/${moduleId}`;
}

export function Home() {
  const { user } = useAuth();
  const { progress, percentFor, reset } = useProgress(user?.id);
  const lastVisited = loadLastVisited();
  const lastEntry = lastVisited
    ? curriculumOrder.find((entry) => entry.moduleId === lastVisited.moduleId)
    : undefined;

  const nextEntry = curriculumOrder.find(
    (entry) => percentFor(entry.moduleId, totalSectionsFor(entry.tipo)) < 100,
  );

  const sectionsDone = Object.values(progress).reduce(
    (total, moduleProgress) =>
      total + Object.values(moduleProgress).filter(Boolean).length,
    0,
  );
  const overallPercent =
    TOTAL_SECTIONS_OVERALL > 0
      ? Math.round((sectionsDone / TOTAL_SECTIONS_OVERALL) * 100)
      : 0;

  async function handleResetProgress() {
    const confirmed = window.confirm(
      "Isso vai apagar todo o seu progresso salvo. Tem certeza?",
    );
    if (!confirmed) return;
    await reset();
  }

  return (
    <div className="home">
      <section className="home__intro">
        <h1>Español para Cantar</h1>
        <p>
          Um curso de espanhol do zero, construído em cima das músicas que você
          canta no culto — quanto mais você avançar, mais fácil fica cantar
          cada uma delas de cor e com boa pronúncia.
        </p>
        <div className="home__overall">
          <span>Progresso geral: {overallPercent}%</span>
          <ProgressBar percent={overallPercent} />
        </div>
      </section>

      {lastEntry ? (
        <Link
          to={moduleLinkFor(lastEntry.moduleId, lastEntry.tipo, lastVisited?.section)}
          className="continue-card"
        >
          <span className="continue-card__label">Continuar de onde parei</span>
          <span className="continue-card__titulo">
            {lastEntry.icone} {lastEntry.titulo}
          </span>
        </Link>
      ) : null}

      <section className="home__modules">
        {curriculumOrder.map((entry) => {
          const totalSections = totalSectionsFor(entry.tipo);
          const percent = percentFor(entry.moduleId, totalSections);
          const isRecommended = nextEntry?.moduleId === entry.moduleId;

          return (
            <Link
              to={moduleLinkFor(entry.moduleId, entry.tipo)}
              key={entry.moduleId}
              className={`module-card${isRecommended ? " module-card--recomendado" : ""}`}
            >
              {isRecommended ? (
                <span className="module-card__badge">
                  {percent === 0 ? "Comece aqui" : "Continue aqui"}
                </span>
              ) : null}
              <span className="module-card__ordem">Módulo {entry.ordem}</span>
              <h2 className="module-card__titulo">
                {entry.icone} {entry.titulo}
              </h2>
              <ProgressBar percent={percent} />
              <span className="module-card__percent">{percent}% concluído</span>
            </Link>
          );
        })}
      </section>

      <button type="button" className="reset-progress-btn" onClick={() => void handleResetProgress()}>
        Reiniciar progresso
      </button>
    </div>
  );
}
