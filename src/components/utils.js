export const colorMap = {
    electric: 'rgb(255, 180, 8)',
    water: '#5599D2',
    fire: '#BE3F39',
    grass: '#8FC265',
    psychic: '#BF5B99',
    ice: '#71ABC2',
    rock: '#845C39',
    ground: '#937843',
    flying: '#C3662D',
    bug: '#689835',
    dragon: '#52A596',
    dark: '#86528C',
    fairy: '#DAB0D3',
    normal: '#A5A5A5',
    fighting: '#C6703A',
    ghost: '#9D70B1',
    steel: '#5B8096',
    poison: '#7C57A0',
  };
  export const gens = [{
    name : 'Kanto'
  },
  {
    name : 'Johto',
  },
  {
    name : 'Hoenn',
  },
  {
    name : 'Sinnoh',
  },
  {
    name : 'Unova',
  },

  
];



export async function fetchPokemon(pokeName,setpokemonResponse) {
  
  if (pokeName.trim() === "") {
    try {
     
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      const data = await response.json();
      console.log(data)
      const pokemonDetailsPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const detailedPokemon = await Promise.all(pokemonDetailsPromises);
      setpokemonResponse(
        detailedPokemon.map((pokemon) => ({
          name: pokemon.name,
          id: pokemon.id,
          type: pokemon.types[0].type.name,
          sprite: pokemon.sprites.other.dream_world.front_default,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    }
  } else {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      if (!response.ok) {
        setpokemonResponse([]);
        alert("pokemon Não encontrado");
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        const data = await response.json();
        console.log(data)
        const pokemonDetailsPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        const detailedPokemon = await Promise.all(pokemonDetailsPromises);
        setpokemonResponse(
          detailedPokemon.map((pokemon) => ({
            name: pokemon.name,
            id: pokemon.id,
            type: pokemon.types[0].type.name,
            sprite: pokemon.sprites.other.dream_world.front_default,
          }))
        );
        return;
        
      }
      const pokemon = await response.json();
      setpokemonResponse([
        {
          name: pokemon.name,
          id: pokemon.id,
          type: pokemon.types[0].type.name,
          sprite: pokemon.sprites.other.dream_world.front_default,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Confira o nome digitado e pressione enter novamente");
    }
  }
};

export async function fetchinfoPokemon (name,setPokemonAbilities,setPokemonDetails,setPokemonStats,setTypeColor) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);

    setPokemonDetails({
      id: data.id,
      name: data.name,
      type: data.types? data.types.map((t)=>t.type.name): [],
      sprite: data.sprites.other.dream_world.front_default,
      height: data.height,
      weight: data.weight,
      baseExpirience: data.base_experience,
    });

    setPokemonAbilities(
      data.abilities.map((ability) => ability.ability.name)
    );
    setPokemonStats(
      data.stats.map((stat) => ({
        statName: stat.stat.name,
        baseStat: stat.base_stat,
      }))
    );
    setTypeColor(data.types.length > 0 ? data.types[0].type.name : "normal");
    console.log("resposta da api", data);
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
  }
};