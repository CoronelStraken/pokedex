import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 30;
  const totalPages = Math.max(1, Math.ceil(favorites.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = favorites.slice(start, start + pageSize);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

  if (favorites.length === 0) {
    return (
      <div className="container py-4">
        <h2 className="text-center">No favorite Pokémon yet!</h2>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">⭐ Favorite Pokémon</h2>

      {/* Grid con estilo igual que PokeGrid */}
      <div className="row g-3">
        {visible.map((pokemon) => (
          <div className="col-12 col-md-6 col-lg-4" key={pokemon.id}>
            <div
              className="card shadow-sm pokedex-card text-center p-3 h-100 position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/pokedex/${pokemon.name}`)}
            >
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

              {/* Botón Remove */}
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={(e) => {
                  e.stopPropagation(); // evita abrir Pokedex al eliminar
                  toggleFavorite(pokemon);
                }}
              >
                Remove
              </button>

              {/* Botón View Pokedex */}
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={(e) => {
                  e.stopPropagation(); // evita conflicto con el clic de la tarjeta
                  navigate(`/pokedex/${pokemon.name}`);
                }}
              >
                View Pokedex
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
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
      )}

      <div className="text-center mt-2 text-muted">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default Favorites;
