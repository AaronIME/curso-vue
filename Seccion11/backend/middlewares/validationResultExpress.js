import { validationResult } from "express-validator";
//Cuando no hay errores, se le indica que vaya a lo siguiente con "next"
export const validationResultExpress = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    next()
}