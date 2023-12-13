import React, { useEffect, useState } from 'react';

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(5);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', { method: 'GET' })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTotalPokemonCount(data.count);
        setPokemonList(data.results.slice(0, visiblePokemonCount));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [visiblePokemonCount]);

  const handleButtonClick = () => {
    setVisiblePokemonCount((prevCount) => prevCount + 5);
  };

  return (
    <div>
      <h1>Pokemons:</h1>
      <p>Total de Pokémons: {totalPokemonCount}</p>
      <p>Mostrando {visiblePokemonCount} de {totalPokemonCount}</p>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{": " + pokemon.name}</li>
        ))}
      </ul>

      <button onClick={handleButtonClick}>Ver mais</button>
    </div>
  );
}

export default Pokemon;
