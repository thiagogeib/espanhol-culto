import { Link } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { curriculumOrder, TOTAL_SECTIONS_FUNDAMENTALS } from "../data/curriculum";
import { TOTAL_SECTIONS_PER_SONG } from "../data/songs";
import { useProgress } from "../hooks/useProgress";

const SONG_MODULE_COUNT = curriculumOrder.filter(
  (entry) => entry.tipo === "musica",
).length;
const TOTAL_SECTIONS_OVERALL =
  TOTAL_SECTIONS_FUNDAMENTALS + SONG_MODULE_COUNT * TOTAL_SECTIONS_PER_SONG;

export function Home() {
  const { progress, percentFor } = useProgress();

  const sectionsDone = Object.values(progress).reduce(
    (total, moduleProgress) =>
      total + Object.values(moduleProgress).filter(Boolean).length,
    0,
  );
  const overallPercent =
    TOTAL_SECTIONS_OVERALL > 0
      ? Math.round((sectionsDone / TOTAL_SECTIONS_OVERALL) * 100)
      : 0;

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

      <section className="home__modules">
        {curriculumOrder.map((entry) => {
          const totalSections =
            entry.tipo === "fundamentos"
              ? TOTAL_SECTIONS_FUNDAMENTALS
              : TOTAL_SECTIONS_PER_SONG;
          const percent = percentFor(entry.moduleId, totalSections);
          const to =
            entry.tipo === "fundamentos"
              ? "/fundamentos"
              : `/musica/${entry.moduleId}`;

          return (
            <Link to={to} key={entry.moduleId} className="module-card">
              <span className="module-card__ordem">Módulo {entry.ordem}</span>
              <h2 className="module-card__titulo">{entry.titulo}</h2>
              <ProgressBar percent={percent} />
              <span className="module-card__percent">{percent}% concluído</span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
