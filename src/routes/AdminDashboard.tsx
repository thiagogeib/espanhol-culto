import { useEffect, useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { curriculumOrder, TOTAL_SECTIONS_FUNDAMENTALS } from "../data/curriculum";
import { TOTAL_SECTIONS_PER_SONG } from "../data/songs";
import { computeModulePercent, type ModuleProgress, type ProgressState } from "../lib/progress";
import { supabase } from "../lib/supabase";

interface OverviewRow {
  learner_id: string;
  nome: string | null;
  email: string | null;
  ultimo_acesso: string | null;
  module_id: string | null;
  progress: ModuleProgress | null;
}

interface LearnerSummary {
  id: string;
  nome: string;
  ultimoAcesso: string | null;
  progress: ProgressState;
}

function totalSectionsFor(tipo: "fundamentos" | "musica"): number {
  return tipo === "fundamentos" ? TOTAL_SECTIONS_FUNDAMENTALS : TOTAL_SECTIONS_PER_SONG;
}

function formatRelative(iso: string | null): string {
  if (!iso) return "nunca acessou";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days} dia${days === 1 ? "" : "s"}`;
}

function groupByLearner(rows: OverviewRow[]): LearnerSummary[] {
  const byId = new Map<string, LearnerSummary>();
  for (const row of rows) {
    const existing = byId.get(row.learner_id);
    const learner: LearnerSummary =
      existing ??
      ({
        id: row.learner_id,
        nome: row.nome?.trim() || row.email || "Sem nome",
        ultimoAcesso: row.ultimo_acesso,
        progress: {},
      } satisfies LearnerSummary);
    if (row.module_id && row.progress) {
      learner.progress[row.module_id] = row.progress;
    }
    byId.set(row.learner_id, learner);
  }
  return Array.from(byId.values());
}

export function AdminDashboard() {
  const [learners, setLearners] = useState<LearnerSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .rpc("espanhol_admin_overview")
      .then(({ data, error: rpcError }) => {
        if (rpcError) {
          setError(rpcError.message);
          return;
        }
        setLearners(groupByLearner((data ?? []) as OverviewRow[]));
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Painel — quem está usando</h1>

      {error ? <p className="admin-dashboard__error">Erro: {error}</p> : null}
      {!learners && !error ? <p>Carregando…</p> : null}
      {learners && learners.length === 0 ? <p>Ninguém se cadastrou ainda.</p> : null}

      <div className="admin-dashboard__list">
        {learners?.map((learner) => (
          <div className="learner-card" key={learner.id}>
            <div className="learner-card__header">
              <span className="learner-card__nome">{learner.nome}</span>
              <span className="learner-card__acesso">{formatRelative(learner.ultimoAcesso)}</span>
            </div>
            <div className="learner-card__modules">
              {curriculumOrder.map((entry) => {
                const percent = computeModulePercent(
                  learner.progress,
                  entry.moduleId,
                  totalSectionsFor(entry.tipo),
                );
                return (
                  <div className="learner-card__module" key={entry.moduleId}>
                    <span className="learner-card__module-titulo">
                      {entry.icone} {entry.titulo}
                    </span>
                    <ProgressBar percent={percent} />
                    <span className="learner-card__module-percent">{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
