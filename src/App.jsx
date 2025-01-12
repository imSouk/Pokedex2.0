import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { use } from "react";
import { colorMap, fetchPokemon, gens } from "./components/utils.jsx";
import Detalhes from "./pages/Detalhes.jsx";



<Detalhes colorMap={colorMap} />;
function App() {
  return (
    <div>
      <Header gens={gens} colorMap={colorMap} />
      <Body fetchPokemon={fetchPokemon} colorMap={colorMap} />
    </div>
  );
}
export default App;
