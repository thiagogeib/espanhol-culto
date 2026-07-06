import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function translateAuthError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (message.includes("Email not confirmed")) {
    return "Você precisa confirmar seu e-mail antes de entrar — veja o link que enviamos pra sua caixa de entrada.";
  }
  return message;
}

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const message = await signIn(email, password);
    setIsSubmitting(false);
    if (message) {
      setError(translateAuthError(message));
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🎵 Español para Cantar</h1>
        <p className="auth-card__subtitle">Entre pra continuar seus estudos</p>
        <form className="auth-form" onSubmit={(event) => void handleSubmit(event)}>
          <label className="auth-form__field">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="auth-form__field">
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="auth-form__error">{error}</p> : null}
          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <p className="auth-card__footer">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
