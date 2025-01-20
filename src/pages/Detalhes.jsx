import { useSearchParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, Type } from "lucide-react";
import { useState, useEffect } from "react";


function Detalhes({colorMap,fetchinfoPokemon}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [pokemonDetails, setPokemonDetails] = useState({});
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
    <div className="">
      <div
        className=" flex justify-center w-screen h-[150px] md:h-[200px] lg:h-[300px] rounded-b-3xl shadow-md"
        style={{ backgroundColor: selectColor(typeColor) }}
      >
        <button className="absolute top-4 left-4" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        {pokemonDetails ? (
          <img
            className="justify-items-center w-[150px] h-[130px] md:w-[200px] md:h-[170px] lg:w-[250px] lg:h-[220px] "
            src={pokemonDetails.sprite}
            alt={pokemonDetails.name}
          />
        ) : (
          <p>carregando imagem....</p>
        )}
        {pokemonDetails ? (
         <div>
           <p className="ml-5 mt-10 text-2xl font-semibold font-mono text-white">
            # {pokemonDetails.id}  
          </p>
          <p className="ml-5 mt-1 text-2xl font-semibold font-mono text-white">{name} </p>
          
          <ul className="">
              {pokemonDetails?.types?.map((type,index)=>
              (<li className="" key={index}>{type}</li>)
              )}
          </ul>
         </div>
          
        ) : (
          <p>carregando...</p>
        )}
      </div>
      <div className="lg:flex grid md:flex justify-center text-center md:text-left lg:text-left ">
        <ul className="font-inter   ml-auto md:m-auto lg:m-auto space-y-2">
          <br />
          <p className="font-bold text- md:text-2xl lg:text-3xl" >Pokedex Data </p>
          <li>Height: {pokemonDetails?.height} </li>
          <li>Weight: {pokemonDetails?.weight} </li>
          {pokemonAbilities.map((ability, index) => (
            <li key={index}>Abilitie: {ability} </li>
          ))}
          <li>Base Experience: {pokemonDetails?.baseExpirience} </li>
        </ul>
        <ul className="font-inter  m-auto md:m-auto lg:m-auto">
          <br /> <br /> <br />
          <p className="font-bold">Base Stats</p>
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

