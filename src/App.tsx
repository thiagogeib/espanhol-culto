import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminDashboard } from "./routes/AdminDashboard";
import { Fundamentals } from "./routes/Fundamentals";
import { Home } from "./routes/Home";
import { LoginPage } from "./routes/LoginPage";
import { SignupPage } from "./routes/SignupPage";
import { SongModule } from "./routes/SongModule";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="fundamentos" element={<Fundamentals />} />
            <Route path="musica/:id" element={<SongModule />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute requireAdmin />}>
          <Route element={<Layout />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
