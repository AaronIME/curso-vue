import mongoose from "mongoose";

try {
    //Con nodejs se puede usar el await sin necesidad de un async function
    
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conexion a la BD establecida");
} catch (error) {
    console.log("Error de conexion: " + error);
}