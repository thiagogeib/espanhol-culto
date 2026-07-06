import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-header__brand">
          🎵 Español para Cantar
        </Link>
        {!isHome ? (
          <Link to="/" className="app-header__back">
            ← Início
          </Link>
        ) : null}
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
