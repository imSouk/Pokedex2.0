import { useSearchParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";



function Detalhes({colorMap,fetchinfoPokemon}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonStats, setPokemonStats] = useState(null);
  const [typeColor, setTypeColor] = useState([]);
  
  useEffect(() => {
    if (name !=="") {
      fetchinfoPokemon(name,setPokemonAbilities,setPokemonDetails,setPokemonStats,setTypeColor);
    }
  }, [name,fetchinfoPokemon]);
  function selectColor(pokemonType) {
    if (colorMap[pokemonType] && pokemonType !== "normal") {
      return colorMap[pokemonType];
    } else {
      return "gray";
    }
  }

  console.log(typeColor);
  return (
    <div>
      <div
        className=" flex justify-center w-screen h-[200px] rounded-b-3xl shadow-md"
        style={{ backgroundColor: selectColor(typeColor) }}
      >
        <button className="absolute top-4 left-4" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        {pokemonDetails ? (
          <img
            className="justify-items-center"
            src={pokemonDetails.sprite}
            alt={pokemonDetails.name}
          />
        ) : (
          <p>carregando imagem....</p>
        )}
        {pokemonDetails ? (
          <p className="ml-5 mt-10 text-center text-2xl font-semibold font-mono text-white">
            # {pokemonDetails.id} <br />
            {name}
          </p>
        ) : (
          <p>carregando...</p>
        )}
      </div>
      <div className="flex">
        <ul className="justify-items-center m-auto space-y-4">
          <br />
          <p>POKEDEX DATA </p>
          <br />
          <li>Height: {pokemonDetails?.height} </li>
          <li>Weight: {pokemonDetails?.weight} </li>
          {pokemonAbilities.map((ability, index) => (
            <li key={index}>Abilitie: {ability} </li>
          ))}
          <li>Base Experience: {pokemonDetails?.baseExpirience} </li>
        </ul>
        <ul className="justify-items-center m-auto">
          <br /> <br /> <br />
          <p>BASE STATS</p>
          {pokemonStats?.map((stat, index) => (
            <li key={index}>
              {stat.statName} : {stat.baseStat}
            </li>
          ))}
        </ul>
      </div>
    </div>
   
  );
}
export default Detalhes;

