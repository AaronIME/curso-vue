//Objeto
const mascota = {
    nombre: "Tom",
    edad: 10,
    vivo: true,
    razas: ["Peludo","Negro"]
}

//Forma comun de almacenar variables y acceder a ellos
const nombreMascota = mascota.nombre
console.log(nombreMascota)

//Desestructurar objetos y acceder a ellos como si fueran variables
const {nombre, edad} = mascota
console.log(nombre)
console.log(edad)

//

