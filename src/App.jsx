import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { colorMap, fetchPokemon, gens } from "./components/utils.js";




function App() {
  return (
    <div>
      <Header gens={gens} colorMap={colorMap} />
      <Body fetchPokemon={fetchPokemon} colorMap={colorMap} />
    </div>
  );
}
export default App;
