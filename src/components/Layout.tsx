import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isHome = location.pathname === "/";

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__brand">
          🎵 Español para Cantar
        </Link>
        <div className="app-header__actions">
          {!isHome ? (
            <Link to="/" className="app-header__back">
              ← Início
            </Link>
          ) : null}
          {user ? (
            <button type="button" className="app-header__signout" onClick={() => void handleSignOut()}>
              Sair
            </button>
          ) : null}
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
