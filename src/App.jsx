import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { use } from "react";
import { colorMap } from "./components/utils.jsx";
import Detalhes from "./pages/Detalhes.jsx";

<Detalhes colorMap={colorMap} />;
function App() {
  return (
    <div>
      <Header colorMap={colorMap} />
      <Body colorMap={colorMap} />
    </div>
  );
}
export default App;
