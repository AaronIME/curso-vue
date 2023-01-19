//Acceso a variables de entorno
import 'dotenv/config';
import "./database/connectdb.js"
import authRouter from './routes/auth.route.js'
//Levantando el primer servidor
import express from "express";

//Inicializando la aplicacion
//Se inicializa con el metodo "express" para poder activar todos sus metodos
const app = express();

// app.get("/", (req, res) =>{
//     res.json({ok:true})
// });

//Usando middlewares

//Hay que indicarle a express que vamos a recibir solicitudes json
app.use(express.json());//#baseURL, authrouter

app.use('/api/v1/', authRouter);//#baseURL, authrouter



//Configurando el puerto
//Con process.env se acceden a todas las variables de entorno
const PORT = process.env.PORT || 5000

//listen: activa el servidor, (#puerto, #funcion)
app.listen(PORT, () => { console.log("Servidor activo: http://localhost:"+PORT);});