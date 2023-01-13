//Funcion que se comporta de forma asincrona
//async await
console.log("11111111111111");
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then((data) => {
        data.results.forEach(element => {
            console.log(element.name);
        });
    })
    .catch(error => {
        console.log(error);
    })

//Await siempre va a funcionar siempre y cuando este dentro de una funcion async
const obtenerPokemones = async() =>{
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const data = await res.json()
        data.results.forEach(element => {
            console.log(element.name);
        });
    } catch (error) {
        console.log(error)
    }
}

console.log("AsyncAwait");
obtenerPokemones()