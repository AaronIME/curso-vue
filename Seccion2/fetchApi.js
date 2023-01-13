//Api Fetch proporciona una interfaz para acceder y manipular partes del cnal http tales como peticiones y respuestas
//Api: respuesta del servidor que nos va entregar que podemos consumir
//Restful Api: no solo se recibe informacion sino que tambien se puede manipular

//Fetch tambien puede leer imagenes como archivos json locales
//Then: indica que se va a esperar una promesa, esperamos los datos
fetch("https://pokeapi.co/api/v2/pokemon/")
    
    .then(res => res.json())
    
    .then((data) => {
        console.log(data.results);
        data.results.forEach(element => {
            console.log(element.name);
        });
    })
    .catch(error => {
        console.log(error);
    })
