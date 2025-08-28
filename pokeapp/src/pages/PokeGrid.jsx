import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PokeGrid() {
  const [allPokemons, setAllPokemons] = useState([]); // índice global (nombre, id, imagen)
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 30;

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Carga UN SOLO ÍNDICE GLOBAL (nombres + ids) para búsqueda transversal
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const first = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1&offset=0"
        );
        const total = first.data.count; // total real desde la API
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${total}&offset=0`
        );

        const enriched = res.data.results.map(({ name, url }) => {
          const match = url.match(/\/pokemon\/(\d+)\//);
          const id = match ? Number(match[1]) : null;
          return {
            id,
            name,
            // arte oficial (se ve mejor que el sprite por defecto)
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        setAllPokemons(enriched);
      } catch (err) {
        console.error("Error loading Pokemon index:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Filtrado transversal por nombre (sobre el índice completo)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allPokemons;
    return allPokemons.filter((p) => p.name.toLowerCase().includes(q));
  }, [search, allPokemons]);

  // Paginación sobre el resultado filtrado
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  // Si cambia la búsqueda, vuelve a la página 1
  useEffect(() => {
    setPage(1);
  }, [search]);

  const goToPage = (n) => {
    setPage(n);
    scrollToTop();
  };

  // Ventana de botones numéricos (máx 5 visibles)
  const getPageWindow = () => {
    const windowSize = 5;
    let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let endPage = startPage + windowSize - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - windowSize + 1);
    }
    const list = [];
    for (let i = startPage; i <= endPage; i++) list.push(i);
    return list;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">PokeGrid</h2>

      {/* Barra de búsqueda transversal */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokémon by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <small className="text-muted">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </small>
      </div>

      {/* Cards (3 columnas en desktop) */}
      
<div className="row g-3">
  {visible.length > 0 ? (
    visible.map((pokemon) => (
      <div className="col-12 col-md-6 col-lg-4" key={pokemon.id}>
        <div className="card shadow-sm pokedex-card text-center p-3 h-100">
          {/* Pantalla negra */}
          <div className="pokedex-screen mb-2">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokedex-image"
            />
          </div>

          {/* Nombre en amarillo */}
          <h6 style={{ color: "#FFD700" }}>
            #{pokemon.id} {pokemon.name}
          </h6>

          <Link
            to={`/pokedex/${pokemon.name}`}
            className="btn btn-outline-primary btn-sm mt-2"
          >
            View Pokedex
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center">No Pokémon found.</p>
  )}
</div>


      {/* Paginación numérica */}
      <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap gap-2">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        {/* Botones con números */}
        {getPageWindow().map((n) => (
          <button
            key={n}
            className={`btn btn-sm ${
              n === currentPage ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => goToPage(n)}
          >
            {n}
          </button>
        ))}

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Info de página */}
      <div className="text-center mt-2 text-muted">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default PokeGrid;
