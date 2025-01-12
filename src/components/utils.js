export const colorMap = {
    electric: "rgb(255, 180, 8)",
    water: "rgb(99, 164, 255)",
    fire: "red",
    grass: "green",
    psychic: "purple",
    ice: "cyan",
    rock: "gray",
    ground: "brown",
    flying: "skyblue",
    bug: "limegreen",
    dragon: "orange",
    dark: "black",
    fairy: "pink",
    normal: "beige",
    fighting: "maroon",
    ghost: "indigo",
    steel: "silver",
    poison: "violet",
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
      type: data.types[0].type.name,
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
    setTypeColor(data.types[0].type.name);
    console.log("resposta da api", data);
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
  }
};