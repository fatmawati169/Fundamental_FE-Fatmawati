import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const fetches = data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          return await res.json();
        });
        Promise.all(fetches).then(setPokemons);
      });
  }, []);

  return (
    <div>
      <h1>Pokémon Dashboard</h1>
      <div className="container">
        {pokemons.map((poke) => (
          <div
            key={poke.id}
            className="card"
            onClick={() => setSelectedPokemon(poke)}
          >
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
            />
            <h3>{poke.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {selectedPokemon && (
        <div
          onClick={() => setSelectedPokemon(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <h2>{selectedPokemon.name}</h2>
            <p>
              Height: {selectedPokemon.height} | Weight: {selectedPokemon.weight}
            </p>
            <p>Type: {selectedPokemon.types.map(t => t.type.name).join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
