// import { validationResult } from "express-validator";


export const login = (req, res) => {
    console.log(req.body);
    res.json({ok:'login'})
}

export const register = (req, res) => {
    // //Obtenemos los errores
    // //validationResult utiliza "req" para intercepar el usuario que es el body que contiene la info y el error
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     //Codigo 400: bad request + errores
    //     return res.status(400).json({errors: errors.array()});
    // }
    
    console.log(req.body);
    res.json({ok:'register'})
}