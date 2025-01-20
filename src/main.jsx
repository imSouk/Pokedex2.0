import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detalhes from "./pages/Detalhes.jsx";
import { colorMap, fetchinfoPokemon } from "./components/utils.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Detalhes",
    element: <Detalhes fetchinfoPokemon={fetchinfoPokemon} colorMap={colorMap} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
