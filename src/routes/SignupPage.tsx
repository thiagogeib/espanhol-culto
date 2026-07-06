import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const message = await signUp(email, password, nome);
    setIsSubmitting(false);
    if (message) {
      setError(message);
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🎵 Español para Cantar</h1>
        <p className="auth-card__subtitle">Crie sua conta pra começar a estudar</p>
        <form className="auth-form" onSubmit={(event) => void handleSubmit(event)}>
          <label className="auth-form__field">
            Seu nome
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
              autoComplete="name"
            />
          </label>
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
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          {error ? <p className="auth-form__error">{error}</p> : null}
          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando conta…" : "Criar conta"}
          </button>
        </form>
        <p className="auth-card__footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
