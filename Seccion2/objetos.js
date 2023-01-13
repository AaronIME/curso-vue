//Creacion de objetos
const mascota = {
    nombre: "Max",
    edad: 10,
    vivo: true,
}
//Acceder a sus propiedades
console.log(mascota);
console.log(mascota.nombre);
console.log(mascota.edad);
console.log(mascota.vivo);

//Asignar una nueva propiedad al objeto
mascota.id = 1
console.log(mascota);
console.log(mascota.id);

mascota.diasBano = [1,2,8,10]
console.log(mascota);
console.log(mascota.diasBano);
console.log(mascota.diasBano[0]);
console.log(mascota.diasBano[2]);
console.log(mascota.diasBano[3]);