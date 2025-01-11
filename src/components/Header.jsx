import pokedeximg from "./img/pokedex.png"
function Header(){
    return (
        <div className="w-screen h-[260px] bg-red-700 "><h1><img className="w-[400x] h-[250px]  m-auto  " src={pokedeximg} alt="pokedex" title="pokedex"/></h1></div>
    );
}
export default Header;
