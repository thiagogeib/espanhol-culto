import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Fundamentals } from "./routes/Fundamentals";
import { Home } from "./routes/Home";
import { SongModule } from "./routes/SongModule";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fundamentos" element={<Fundamentals />} />
          <Route path="musica/:id" element={<SongModule />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
