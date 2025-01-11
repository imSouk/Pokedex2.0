import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { func } from "prop-types";
import { useState } from "react";

function withNavigation(Component) {
  return function NavigationComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

function Body() {
  const navigate = useNavigate();
  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(21);
  const [pokeName, setpokeName] = useState("");
  const [pokemonResponse, setpokemonResponse] = useState([]);
  const [colormap, setcolorMap] = useState({
    electric: "yellow",
    water: "blue",
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
  });
  useEffect(()=>{
    fetchPokemon();
  },[]);
  function onButtonPrevClick() {
    if (r1 > 0 && r2 > 20) {
      setR1(r1 - 20);
      setR2(r2 - 20);
    }
  }
  function onButtonNextClick() {
    if (r2 < 151) {
      setR1(r1 + 20);
      setR2(r2 + 20);
    }
  }

  function onDivClick(name) {
    const query = new URLSearchParams();
    query.set("name", name);
    navigate(`/Detalhes?${query.toString()}`);
  }
  const onInputChange = (event) => {
    setpokeName(event.target.value);
  };
  const onInputKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchPokemon();
    }
  };
  const fetchPokemon = async () => {
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
  return (
    <div className="grid grid-rows-[auto_auto] justify-center gap-6 p-5">
      <input
        className="rounded-md pl-2 pb-1 bg-slate-200 m-auto w-[270px] "
        placeholder="Insira o nome do pokemon desejado"
        type="text"
        value={pokeName}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 justify-items-center">
        {pokemonResponse.slice(r1,r2).map((pokemon, index) => {
          const typeColor = colormap[pokemon.type] || "white";
          return (
            <div
              className="grid bg-slate-200 w-[300px] y-[500px] rounded-3xl justify-items-center m-4 shadow-lg"
              onClick={() => onDivClick(pokemon.name)}
              key={index}
            >
              <img
                className=" w-[200px] h-[200px] pt-8 mb-4 "
                src={pokemon.sprite}
                alt={pokemon.name}
              />
              <p className=" text-2xl font-semibold font-mono mb-4">
                {r1 + index + 1}.{pokemon.name}
              </p>
              <p
                className="w-[80px] h-[25px] rounded-md text-center font-semibold mb-4"
                style={{ backgroundColor: typeColor }}
              >
                {pokemon.type}{" "}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          className="w-[100px] h-[25px] bg-slate-300 rounded-md font-sans font-semibold"
          onClick={onButtonPrevClick}
        >
          PREV
        </button>
        <button
          className="ml-10 w-[100px] h-[25px] bg-slate-300  font-sans font-semibold rounded-md "
          onClick={onButtonNextClick}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Body;
