import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { FaStar } from "react-icons/fa";

function PokeGrid() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 30;

  // Importamos funciones del contexto
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Cargar todos los Pokémon
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const first = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1&offset=0"
        );
        const total = first.data.count;

        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${total}&offset=0`
        );

        const enriched = res.data.results.map(({ name, url }) => {
          const match = url.match(/\/pokemon\/(\d+)\//);
          const id = match ? Number(match[1]) : null;
          return {
            id,
            name,
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

  // Filtrar por nombre
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allPokemons;
    return allPokemons.filter((p) => p.name.toLowerCase().includes(q));
  }, [search, allPokemons]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const goToPage = (n) => {
    setPage(n);
    scrollToTop();
  };

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
      <h2 className="mb-4 text-center">
  PokeGrid
</h2>


      {/* Barra de búsqueda */}
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

      {/* Grid */}
      <div className="row g-3">
        {visible.length > 0 ? (
          visible.map((pokemon) => (
            <div className="col-12 col-md-6 col-lg-4" key={pokemon.id}>
              <div className="card shadow-sm pokedex-card text-center p-3 h-100 position-relative">
                {/* Botón de favorito */}
                <button
                  className="btn position-absolute top-0 end-0 m-2"
                  style={{ background: "transparent", border: "none" }}
                  onClick={() => toggleFavorite(pokemon)}
                >
                  <FaStar
                    size={22}
                    color={isFavorite(pokemon.id) ? "#FFD700" : "#ccc"}
                  />
                </button>

                {/* Imagen */}
                <div className="pokedex-screen mb-2">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokedex-image"
                  />
                </div>

                {/* Nombre */}
                <h6 style={{ color: "#FFD700" }}>
                  #{pokemon.id} {pokemon.name}
                </h6>

                {/* Link */}
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

      {/* Paginación */}
      <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap gap-2">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

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

      <div className="text-center mt-2 text-muted">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default PokeGrid;
