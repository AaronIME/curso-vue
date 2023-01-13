//El metodo filter crea un array con los elementos que cumplen una condicion
const obtenerPokemones = async() =>{
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const data = await res.json()
        const arrayNombres = data.results.filter((poke)=>poke.name != "bulbasaur").map(poke => poke.name)
        console.log(arrayNombres);
    } catch (error) {
        console.log(error);
    }

    
}

console.log(obtenerPokemones());