//Funcion normal
function sumar(){
    console.log(10);
}
sumar();

//Funcion de flecha
const sumaDos = () => {
    console.log(20);
}
sumaDos()

//Parametros
//Al pasar parametros a la funcion de flecha se hace dentro de los parentesis
//Si solo recibe un parametro no se requieren los parentesis
const sumaTres = num => {
    console.log(num);
}
sumaTres(3)

//Cuando se envian dos paretros los parentesis son requeridos
const sumaCuatro = (num1, num2) => {
    console.log(num1+num2);
}
sumaCuatro(3,5)

//En las funciones de flecha es posible retornar valores 
//Forma convencional
const sumaCinco = (num1, num2) => {
    return (num1+num2);
}
resultado = sumaCinco(3,5);
console.log(resultado);

//Si las funciones son simples se pueden reducir al momento de retornar un valor
//Se pueden omitir las llaves como la palabra return
const sumaSeis = (num1, num2) => (num1+num2)

resultado2 = sumaSeis(3,3);
console.log(resultado2);

//Ejemplo 2 reduccion de codigo
//En vue se utilizaran los parentesis de la parte del return para retornar etiquetas de html
const mensaje = nombre => ("Hola soy " + nombre)

resultado3 = mensaje("Aaron")
console.log(resultado3);

//En las funciones de flecha es posible tener valores por defecto, de esta forma el parametro es opcional
const sumaSiete = (num=1) => {
    console.log(num+3);
}
sumaSiete();