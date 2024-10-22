import { useEffect, useState } from "react";
import "./index.css";
import PokemonCards from "./PokemonCards";

const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon";

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`${API}?limit=100`);
      const data = await res.json();

      const detailedPokemon = await data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemon);

      setLoading(false);
      setPokemon(detailedResponses);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.slice(0, visibleCount).map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
          <div className="load-more-container">
            <button className="load-more-button" onClick={loadMore}>
              Load More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
