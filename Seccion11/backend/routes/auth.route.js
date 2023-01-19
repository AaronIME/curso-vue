import express from 'express';
import { login, register } from '../controllers/auth.controller.js'
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';


//Middleware para gestionar rutas del sitio web
const router = express.Router()

//req: lo que envia el usuario como peticion
//res: respuesta al usuario
// router.post('/login', (req, res) => {
//     res.json({ok:'login'})
// });


router.post('/login',
    [
        body("email", "Formato de email invalido").trim().isEmail().normalizeEmail(),
        body("password", "Minimo 6 caravteres").trim().isLength({ min: 6 }),
        validationResultExpress
    ]
    , login);

router.post('/register', [
    //NormalizeEmail: normaliza el texto
    body("email", "Formato de email invalido").trim().isEmail().normalizeEmail(), //#Propiedad que se quiere validar, #Mensaje de error, #Validaciones
    body("password", "Minimo 6 caravteres").trim().isLength({ min: 6 }),
    body("password", "Formato de contraseña invalida")
        //#value: "password" de body
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('No coinciden las contraseñas');
            }
            return value;
        }),
    validationResultExpress
], register);

//Se exporta para utilizarlo en el archivo base
//Con el export por default es posible asignar el nombre que se necesite
//router contiene toda la informacion de las rutas
export default router;

//En el navegador solo se pueden hacer peticiones get
//Otras acciones pueden ser realizadas por medio de formularios y javascript