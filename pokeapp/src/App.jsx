import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PokeGrid from "./pages/PokeGrid";
import Pokedex from "./pages/Pokedex";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/grid" element={<PokeGrid />} />
        <Route path="/pokedex/:name" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}

export default App;
