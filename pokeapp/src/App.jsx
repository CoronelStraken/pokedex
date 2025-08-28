import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import PokeGrid from "./pages/PokeGrid";
import Pokedex from "./pages/Pokedex";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Header de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-danger" to="/">
            PokeApp
          </Link>
          <div className="ms-auto d-flex gap-3">
            <Link className="btn btn-outline-primary" to="/grid">
              PokeGrid
            </Link>
            <Link className="btn btn-warning" to="/favorites">
              ⭐ Favorites
            </Link>
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/grid" element={<PokeGrid />} />
        <Route path="/pokedex/:name" element={<Pokedex />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
