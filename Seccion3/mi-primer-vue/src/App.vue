<script setup>
  //Libreria para utilizar ref, propiedades computadas
  import { ref, computed } from 'vue'



  const name = "Vue dinamico"
  const styleColor = "color:blue"
  const arrayColores = ["red", "blue", "yellow", "black"]
  const activo = false
  /*
  const arrayFrutas = ["🍎", "🍌", "🍉", "🍓", "🍒"];
  */

  const arrayFrutas = [
    {
      name: "Manzana",
      price: "$1.00",
      description: "Una manzana",
      id: 1
    },
    {
      name: "Pera",
      price: "$2.00",
      description: "Una pera",
      id: 2
    },
    {
      name: "Naranja",
      price: "$3.00",
      description: "Una naranja",
      id: 3
    },
  ];

  const objetoFruta = {
    name: "Manzana",
    price: "$1.00",
    description: "Una manzana",
    id: 1
  }

  const arrayFrutas2 = [
    {
      name: "Manzana",
      price: "$1.00",
      description: "Una manzana",
      stock: 0
    },
    {
      name: "Pera",
      price: "$2.00",
      description: "Una pera",
      stock: 10
    },
    {
      name: "Naranja",
      price: "$3.00",
      description: "Una naranja",
      stock: 20
    },
  ];

  //Metodo - methods
  const handleClick = (message) => {
    console.log(message);
  }

  //let counter = 0;

  //Ref: es una de las formas con las que podemos trabajar con reactividad, indica que se tiene que renderizar
  //cuando sea actualiza el valor

  //Al utilizar ref se convierte en una variable reactiva
  //Ref no solo se utiliza para tipos de dato primitivos
  const counter = ref(0);//0 es el valor inicial

  const colorContador = ref("color: white");

  const incrementar = () => {
    //Cuando la variable es reactiva se tiene que acceder por medio de value
    //Lo que devuelve vue es un objeto que contiene la propiedad value
    counter.value++;
    console.log(counter.value);
  }

  const decrementar = () => {
    counter.value--;
    console.log(counter.value);
  }

  const resetear = () => {
    counter.value = 0;
    console.log(counter.value);
  }

  //Computed recibe una funcion de flecha, se requiere un return explicito
  //Las propiedades calculadas se almacenan en cache en funcion de sus dependencias reactivas
  //Solo se evalua una vez que sus dependencias cambian
  const classCounter = computed(() => {
    if (counter.value > 0) {
      return "positive";
    } else if (counter.value < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  })

  const arrayNumeros = ref([]);

  const agregarNumero = () => {
    arrayNumeros.value.push(counter.value)
  }

  const botonDeshabilitado = computed(() => {
    if (arrayNumeros.value.indexOf(counter.value) != -1) {
      return true;
    } else {
      return false;
    }
  })
</script>

<template>
  <div class="container text-center mt-3">

    <!--Para visualizar variables se utilizan llaves dobles-->
    <h1>Hola {{ name }}</h1>
    <!--Es posible utilizar funciones en las variables, son expresiones de javascript-->
    <h1>Hola2 {{ name.toUpperCase() }}</h1>
    <!--En vue es posible imprimir la estructura de un arreglo directamente-->
    <h1>{{ arrayColores }}</h1>

    <!--Para pasar propiedades a los elementos se utiliza v-bind ##Se puede sustituri por ":"-->
    <!--<h2 v-bind:style="styleColor">Soy azul</h2>-->
    <h2 :style="styleColor">Soy azul</h2>

    <!--Haciendo uso de la interpolacion de javascript-->
    <h2 :style="`color: ${arrayColores[2]}`">Soy amarillo</h2>

    <!--Haciendo uso de op ternario(condicional) para mostrar un texto-->
    <!--Las llaves dobles aceptarian todo lo que tenga un retorno inmediato-->
    <h2>{{ activo? "Estoy activo": "Estoy inactivo" }}</h2>

    <!--USO DE DIRECTIVAS-->
    <!--El trabajo de una directiva es aplicar actualizaciones de forma reactiva en el dom-->
    <!--V-IF-->
    <h2 v-if="activo === true">Estoy activo</h2>
    <h2 v-else-if="activo === false">Estoy activo</h2>
    <h2 v-else>Estoy indeciso</h2>

    <!--Al utilizar v-show agrega a los estilos del elemento display:none, se recomienda utilizar 
    cuando se tiene que ocultar/mostrar mucho un elemento-->
    <h2 v-show="activo">Utilizando v-show</h2>

    <!--Directiva V-FOR-->
    <!--Itera una lista de elementos-->
    <!--Se puede rasterar la identidad de cada nodo del array para reutilizar y reordenar los elementos existentes
  con la palabra key, key es unico por cada elemento-->

    <!--
  {{arrayFrutas}}
  <ul>
    <li v-for="fruta, index in arrayFrutas" :key="index">
      {{index}} - {{fruta}}
    </li>
  </ul>
  -->

    <!--Array de objetos-->
    <ul>
      <li v-for="fruta, index in arrayFrutas" :key="fruta.id">
        {{ fruta.name }} - {{ fruta.price }} - {{ fruta.description }}
      </li>
    </ul>

    <!--V-FOR Objeto-->
    <!--Al recorrer un objeto se puede dar por parametro el nombre de la propiedad-->
    {{objetoFruta}}
    <ul>
      <li v-for="value, propiedad, index in objetoFruta" :key="value">
        {{index}} - {{propiedad}}: {{value}}
      </li>
    </ul>

    <!--V-FOR V-IF Objeto-->
    <!--V-IF tiene una mayor prioridad que V-FOR-->
    <!--
  {{arrayFrutas2}}
  <ul>
    <li v-for="fruta in arrayFrutas2" v-if="fruta.stock > 0">
      {{fruta.name}} - {{fruta.price}} - {{fruta.description}} - {{fruta.stock}}
    </li>
  </ul>
  -->

    <!--##Solucion 1
  {{arrayFrutas2}}
  <ul>
    <li v-for="fruta in arrayFrutas2">
      <span v-if="fruta.stock > 0">
        {{fruta.name}} - {{fruta.price}} - {{fruta.description}} - {{fruta.stock}}
      </span>
    </li>
  </ul>
  -->

    <!--##Solucion 1-->
    {{arrayFrutas2}}
    <ul>
      <template v-for="fruta in arrayFrutas2" :key="fruta.name">
        <li v-if="fruta.stock > 0">
          {{fruta.name}} - {{fruta.price}} - {{fruta.description}} - {{fruta.stock}}
        </li>
      </template>
    </ul>

    <!--EVENTOS-->
    <!--V-ON-->
    <!--Se acorta con un simbolo @ para escuchar eventos y ejecutar javascript-->

    <!--
  <button v-on:click="handleClick">Activame</button>
  <button @click="handleClick">Activame</button>
  -->

    <!--Evento con parametros-->
    <!--
  <button v-on:click="handleClick('Mensaje 1')">Activame</button>
  <button @click="handleClick('Mensaje 2')">Activame</button>
  -->

    <!--Modificadores de eventos-->
    <button v-on:click.right.prevent="handleClick('Mensaje right')">Activame right</button>
    <button @click="handleClick('Mensaje left')">Activame left</button>
    <button @click.middle="handleClick('Mensaje middle')">Activame middle</button>


    <!--REACTIVIDAD-->
    <!--La reactividad sirve para que los cambios que se hagan en javascript sean visualizados en el DOM-->
    <div class="btn-group" role="group" aria-label="Button group">  
      <button @click="incrementar()" class="btn btn-success">Incrementar</button>
      <button @click="decrementar()" class="btn btn-danger">Decrementar</button>
      <button @click="resetear()" class="btn btn-secondary">Resetear</button>
      <button @click="agregarNumero()" :disabled="botonDeshabilitado" class="btn btn-primary">Agregar numero</button>
    </div>

    <p :class="classCounter">
      <!--Dentro del template no se tiene que acceder a la propiedad value, Vue lo hace por defecto-->
      <!--Con las variables reactivas solo se renderiza las partes que le indiquemos que son reactivas-->
      Contador: {{ counter }}
    </p>

    

    <ul class="list-group" v-for="numero in arrayNumeros">
      <li class="list-group-item">{{numero}}</li>
    </ul>

  </div>
</template>

<style>
  h1 {
    color: red;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }

  .neutral {
    color: white;
  }
</style>