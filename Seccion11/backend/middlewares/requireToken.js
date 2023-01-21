import jwt from "jsonwebtoken"

export const requireToken = (req, res, next) => {
    try {
        //Revisamos que exista el token
        // let token = req.cookies.token;//Se recibe el token
        let token = req.headers?.authorization

        console.log("TOKEN:");
        console.log(token);
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
        const TokenVerificationErrors = {
            "invalid signature":"La firma del jwt no es valida",
            "jwt expired":"JWT expirado",
            "jwt expired":"Token no valido",
            "No Bearer":"Utiliza formato Bearer",
            "jwt malformed":"JWT formato no valido"
        }
        return res.status(401).send({error: TokenVerificationErrors[error.message]});
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
        const TokenVerificationErrors = {
            "invalid signature":"La firma del jwt no es valida",
            "jwt expired":"JWT expirado",
            "jwt expired":"Token no valido",
            "No Bearer":"Utiliza formato Bearer",
            "jwt malformed":"JWT formato no valido"
        }
        return res.status(401).send({error: TokenVerificationErrors[error.message]});
    }
}