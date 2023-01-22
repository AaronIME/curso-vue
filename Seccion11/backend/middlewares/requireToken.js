import jwt from "jsonwebtoken"
import { tokenVerificationErrors } from "../utils/tokenManager.js";


export const requireToken = (req, res, next) => {
    try {
        //Revisamos que exista el token
        // let token = req.cookies.token;//Se recibe el token
        let token = req.headers?.authorization

        if(!token){
            throw new Error('No existe el token en el header usa Bearer')
        }
        
        token = token.split(" ")[1];

        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        //Agregando parametros al request
        req.uid = uid;

        next()
    } catch (error) {
        console.log(error.message);
        
        return res.status(401).send({error: tokenVerificationErrors[error.message]});
    }
}

export const requireTokenRespaldo = (req, res, next) => {
    try {
        //Revisamos que exista el token
        let token = req.headers?.authorization
        if(!token){
            throw new Error('No existe el token en el header usa Bearer')
        }
        
        token = token.split(" ")[1];

        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        //Agregando parametros al request
        req.uid = uid;

        next()
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({error: tokenVerificationErrors[error.message]});
    }
}