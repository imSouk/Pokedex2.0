import pokedeximg from "./img/pokedex.png"
function Header({gens}){
    return (
        <div>
            <div className=" w-screen h-[60px] m-auto  bg-[rgb(100,6,7)] rounded-b-lg shadow-xl "><h1><img className="w-[140x] h-[55px]  m-auto " src={pokedeximg} alt="pokedex" title="pokedex"/></h1></div>
            <div className="w-screen h-[65px] -m-0.5 bg-slate-300 flex  items-center justify-center space-x-1 shadow-lg rounded-md" >
            {gens.map((gen,index)=>{
                return(
                   <div key={index} className="  hover:cursor-pointer text-center w-[60px] h-[63px] border-2 border-opacity-50  hover:brightness-125 border-dotted border-slate-500 bg-slate-400 rounded-sm transition duration-500  ">
                    {gen.name}
                   </div> 
                )
            })}
            </div >
            
        </div>
    );
}
export default Header;
