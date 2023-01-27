console.log('Funcionando');
//Vue puede ser accedido cuando se utilice CDN
//Recibe un objeto que contiene la data que va a ser reflejada en la vista
const app = Vue.createApp({
    data(){
        return{
            titulo:'Mi banco con vue js',
            cantidad: 500,
            enlace: 'https://google.com',
            estado: false,
            servicios: ['transferencias', 'pagos', 'giros'],
            desactivar: false
        }
    },
    methods: {
        agregarSaldo(){
            this.cantidad += 100;
        },
        disminuirSaldo(saldo){
            if(this.cantidad == 0){
                this.desactivar = true;
                alert('saldo en cero!');
                return 
            }
            this.cantidad -= saldo;
        }
    },
    computed: {
        colorCantidad(){
            return this.cantidad > 500 ? 'text-success' : 'text-danger';
        },
        mayusculasTexto(){
            return this.titulo.toUpperCase();
        }
    }
})