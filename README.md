# PokeApp

Aplicación tipo Pokédex hecha con **React + Vite**.  
Permite buscar Pokémon (búsqueda transversal), paginar resultados, ver el detalle (Pokedex) y marcar/desmarcar favoritos con persistencia en memoria (context).


## 🔗 Uso de la PokéAPI

Esta aplicación consume datos de la [**PokéAPI**](https://pokeapi.co/), un API pública que ofrece información completa sobre todos los Pokémon.  
Se utiliza tanto para el listado como para los detalles individuales de cada criatura.

### **Endpoints utilizados**

- **Listado de Pokémon**  
  ```bash
  https://pokeapi.co/api/v2/pokemon?limit={TOTAL}&offset=0


- **Detalle de un Pokémon específico**
    ```bash
    https://pokeapi.co/api/v2/pokemon/{name}
    
Se utiliza en la vista de detalles para mostrar información completa del Pokémon seleccionado, como:

- Tipos
- Altura y peso
- Descripción

- **Imágenes oficiales**
Las imágenes de cada Pokémon se obtienen desde:
    ```bash
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
    




## ✨ Funcionalidades
- 🔎 **Búsqueda transversal** por nombre (sobre todo el índice).
- 📄 **Paginación** con botones Previous / Next y numéricos (salta al inicio al cambiar de página).
- 📘 **Detalle Pokédex** con imagen, tipos, altura, peso y descripción.
- ⭐ **Favoritos**: marcar desde el grid, listar y remover en la vista de favoritos.
- 🎨 **Estilo Pokédex**: borde rojo, “pantalla” negra para sprites, tipografía limpia.
- 🧪 **Test unitario** (Vitest + Testing Library) para la vista de favoritos.

## 🛠️ Tech Stack
- React 19 + Vite  
- React Router DOM  
- Axios  
- Bootstrap 5  
- Vitest + @testing-library/react + jsdom  

## 📦 Requisitos
- Node.js 18+  
- npm 9+  

## 🚀 Comandos
```bash
# instalar dependencias
npm install

# modo desarrollo
npm run dev

# build de producción
npm run build

# previsualizar build
npm run preview

# tests
npm run test
