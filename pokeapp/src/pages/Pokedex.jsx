import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Pokedex() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Datos principales del Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const species = await axios.get(response.data.species.url);

        setPokemon({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other["official-artwork"].front_default,
          types: response.data.types.map((t) => t.type.name),
          height: response.data.height / 10, // en metros
          weight: response.data.weight / 10, // en kg
        });

        // Busca la descripción en inglés
        const entry = species.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setDescription(entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available.");
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="container text-center py-4">
        <p className="text-danger">Error loading Pokémon data.</p>
        <Link to="/grid" className="btn btn-secondary mt-3">
          Back to PokeGrid
        </Link>
      </div>
    );
  }

  return (
  <div className="container py-4">
    <div className="text-center mb-4">
      <h2 className="text-capitalize">
        #{pokemon.id} {pokemon.name}
      </h2>
    </div>

    <div
      className="card shadow p-4"
      style={{
        backgroundColor: "#FF0000", // rojo principal
        borderRadius: "20px",
        color: "white",
      }}
    >
      <div className="text-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "10px",
          }}
        />
      </div>

      <div className="mt-4">
        <p><strong>Type(s):</strong> {pokemon.types.join(", ")}</p>
        <p><strong>Height:</strong> {pokemon.height} m</p>
        <p><strong>Weight:</strong> {pokemon.weight} kg</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    </div>

    <div className="text-center mt-4">
      <Link to="/grid" className="btn btn-primary">
        Back to PokeGrid
      </Link>
    </div>
  </div>
);

}

export default Pokedex;
