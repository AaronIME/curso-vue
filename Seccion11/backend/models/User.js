//Se instancia Schema, creador de modelos
import { Schema, model } from "mongoose";

//Definicion de schema
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
        index: { unique:true }
    },
    password:{
        type: String,
        required: true
    },
})

//User tendra todos los metodos disponibles para buscar, borrar, actualizar de mongoose
//Hay que transformar al user en un modelo
export const User = model('user', userSchema)//#Nombre del usuario #schema