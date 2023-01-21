//Se instancia Schema, creador de modelos
import mongoose from "mongoose";
import bcrypt from "bcryptjs"

//Definicion de schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
})

//Pre: Antes de que se realice una accion podemos hacer una intercepcion
//Recibe #acccion #funcion comun (Para que se tenga alcance del this)
//Se necesita el alacance del this porque todo lo que estamos capturando es todo lo del esquema
//Next es para que siga con las operaciones
userSchema.pre("save", async function (next) {
    //Instancia del esquema (userSchema)
    const user = this;
    
    if (user.isModified('password')) {
        try {
            //Generamos los saltos
            const salt = await bcrypt.genSalt(10);

            //Hash generado
            //#contraseña y #saltos
            //Se le asigna el hash a la contraseña del usuario
            user.password = await bcrypt.hash(user.password, salt);

            next();
        } catch (error) {
            console.log(error);
            throw new Error("Fallo la generacion de hash de contraseña")

        }
    }
})
//Generando nuevo metodo: "comparePassword"
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

//User tendra todos los metodos disponibles para buscar, borrar, actualizar de mongoose
//Hay que transformar al user en un modelo
export const User = mongoose.model('User', userSchema)//#Nombre del usuario #schema