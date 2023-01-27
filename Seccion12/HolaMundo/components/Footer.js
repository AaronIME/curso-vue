// Creando componente
app.component('footer-banco', {
    props: ['cantidad', 'fecha'],
    template: `
    <div class="bg-dark py-3 mt-2 text-white">
        <h3>{{texto}} - {{cantidad}}</h3>
        <p>{{fecha}}</p>
    </div>
    `,
    data(){
        return{
            texto:'Footer de mi sitio web',
        }
    }

})