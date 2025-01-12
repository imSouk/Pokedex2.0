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

function Body({colorMap,fetchPokemon}) {
  const navigate = useNavigate();
  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(20);
  const [pokeName, setpokeName] = useState("");
  const [pokemonResponse, setpokemonResponse] = useState([]);

  useEffect(()=>{
    fetchPokemon("",setpokemonResponse);
  },[]);
  function onButtonPrevClick() {
    if (r1 > 0 && r2 > 19) {
      setR1(r1 - 19);
      setR2(r2 - 19);
    }
  }
  function onButtonNextClick() {
    if (r2 < 151) {
      setR1(r1 + 19);
      setR2(r2 + 19);
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
      fetchPokemon(pokeName, setpokemonResponse);
    }
  };

  return (
    <div className=" min-h-screen bg-[url(/abstract-background-gray-wallpaper-preview.jpg)] bg-cover bg-center bg-no-repeat grid grid-rows-[auto_auto] justify-center gap-6 p-5 rounded-md">
      <input
        className="rounded-md pl-2 pb-1 bg-slate-200 m-auto w-[270px] "
        placeholder="Insira o nome do pokemon desejado"
        type="text"
        value={pokeName}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />

      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 justify-items-center min-h-screen[400px]">
        {pokemonResponse.slice(r1,r2).map((pokemon, index) => {
          const typeColor = colorMap[pokemon.type.toLowerCase()] || "white";
          console.log("Cor correspondente:", colorMap[pokemon.type.toLowerCase()]);
          return (
            <div
              className="grid bg-slate-200 w-[125px] h-[180px] rounded-3xl justify-items-center m-4 shadow-lg"
              onClick={() => onDivClick(pokemon.name)}
              key={index}
            >
              <img
                className=" w-[90px] h-[90px] pt-4 "
                src={pokemon.sprite}
                alt={pokemon.name}
              />
              <p className="  font-semibold font-mono mb-4">
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
