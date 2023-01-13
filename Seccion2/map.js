//El metodo map crea un nuevo array de los resultados de la llamada de la funcion indicada
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res=> res.json())
    .then(data => {
        
        let arrayNombres = []
        data.results.forEach(element => {
            arrayNombres.push(element.name)
        });
        console.log(arrayNombres);
    })
    .catch(error => console.log(error))

const obtenerPokemones = async() =>{
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const data = await res.json()
    const arrayNombres = data.results.map((poke) => poke.name)
    console.log(arrayNombres);
}

obtenerPokemones()