//Objeto
const web = {
    nombre: "bluuWeb",
    //Un objeto puede almacenar otro objeto dentro de el
    links: {
        enlace: "ww.bluuweb.com"
    },
    redesSociales:{
        //Se pueden declarar propiedades si no pertenecen al objeto donde ya fueron declarados
        youtube:{
            enlace: "youtube.com/bluuWeb",
            nombre: "bluuWeb"
        },
        facebook:{
            enlace: "facebook.com/bluuWeb",
            nombre: "bluuWeb"
        },
        facebook:{
            enlace: "facebook.com/bluuWeb",
            nombre: "bluuWeb fb"
        }
    }
}

//Acceder a propiedades
console.log(web.redesSociales.youtube.enlace);

//Almacener propiedades
const enlaceYT = web.redesSociales.youtube.enlace
console.log(enlaceYT);

//Desestructurando el objeto
const {enlace,nombre} = web.redesSociales.facebook
console.log(enlace);
console.log(nombre);