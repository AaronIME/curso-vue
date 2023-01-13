//Se duplica la declaracion
/*
var edad = 10;
var edad = 20;
console.log(edad)
*/

//Una variable let no se puede declarar 2 veces, puede ser modificado
/*
let edad = 10;
let edad = 20;
console.log(edad);
/*

//Con var el valor es el mismo en todo el programa 20
/*
var edad = 10;
    if(true){
        var edad = 20;
        console.log(edad);
    }
console.log(edad);
*/

//Con let el valor solo existe dentro del bloque donde esta declarado
/*
let edad = 10;
    if(true){
        let edad = 20;
        console.log(edad);
    }
console.log(edad);
*/

//Constante y let viven de la misma forma
/*
const edad = 10;
    if(true){
        const edad = 20;
        console.log(edad);
    }
console.log(edad);
*/

//Constante no puede declararse 2 veces, ademas no puede ser modificada
/*
const edad = 10;
const edad = 20;
console.log(edad);
*/
/*
const edad = 10;
edad = 20;
console.log(edad);
*/

/*********************ARREGLOS**********************/

//Se pueden declarar 2 veces un mismo arreglo con var
/*
var arrayNumeros = [10, 20, 30]
var arrayNumeros = [10, 20, 30, 40]
console.log(arrayNumeros);
*/

//Usando const un arreglo no se puede declarar 2, veces y no se puede modificar como let pero se pueden utilizar diferentes funciones o propiedades para modificarlo
/*
const arrayNumeros = [10, 20, 30]
arrayNumeros.push(40)
console.log(arrayNumeros);
*/

//Cuando se utilizan objetos const puede ser modificado utilizando las propiedades del objeto que se quiere modificar
//Ademas se pueden agregar mas propiedades
const persona = {
    nombre: "Juan",
    edad:20
}
persona.nombre = "Aaron"
persona.nacionalidad = "Mexicana"
console.log(persona);