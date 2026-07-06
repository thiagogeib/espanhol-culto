import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ADMIN_EMAIL } from "../lib/supabase";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Carregando…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
