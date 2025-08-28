import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FavoritesProvider } from "../context/FavoritesContext";
import Favorites from "../pages/Favorites";

describe("Favorites component", () => {
  it("should render message when no favorites exist", () => {
    render(
      <FavoritesProvider>
        <Favorites />
      </FavoritesProvider>
    );
    expect(screen.getByText(/No favorite Pokémon yet!/i)).toBeInTheDocument();
  });
});
