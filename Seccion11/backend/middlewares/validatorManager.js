import axios from "axios";
import { validationResult, body, param } from "express-validator";

//Cuando no hay errores, se le indica que vaya a lo siguiente con "next"
export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const bodyRegisterValidator = [
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
    validationResultExpress,
];

export const bodyLoginValidator = [
    body("email", "Formato de email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 6 caravteres").trim().isLength({ min: 6 }),
    validationResultExpress
];

export const paramsLinkValidator = [
    param("id", "Formato no valido").trim().notEmpty().escape(),
    validationResultExpress
]

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto").trim().notEmpty()
    .custom(async value =>{
        try {
            if(!value.startsWith("https://")){
                value = "https://" + value
            }
            console.log(value);
            await axios.get(value);
            return value;
        } catch (error) {
            console.log(error.message);
            throw new Error("Not found longLink 404")
        }
    }),
    validationResultExpress

]