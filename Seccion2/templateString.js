//Ejemplo funciones de flecha convencional
const numero = (num) => {
    return "El numero es: " + num
}
const resultado = numero(10)
console.log(resultado);

//Concatener codigo javascript con string
const numero2 = (num1,num2) => {
    return `El numero es ${num1 + num2}`
}
const resultado2 = numero2(10, 5)
console.log(resultado2);

//Codigo reducido
const numero3 = (num1,num2) => `El numero es ${num1 + num2}`

const resultado3 = numero3(11, 9)

console.log(resultado3);




