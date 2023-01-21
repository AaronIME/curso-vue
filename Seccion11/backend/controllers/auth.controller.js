// import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';


export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(403).json({error: "No existe el usuario registrado"});
        }
        const respuestaPassword = await user.comparePassword(password)
        if(!respuestaPassword){
            return res.status(403).json({error: "Contraseña incorrecta"});
        }

        //Generar el token jwt
        //Generando payload
        // const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET)
        const {token, expiresIn} = generateToken(user.id);

        generateRefreshToken(user.id, res);
        
        // res.cookie("token",token,{
        //     httpOnly: true,//La cookie solo va a vivir dentro de htttp y no puede ser accedida por javascript
        //     secure: !(process.env.MODO == "developer")//Hace que viva dentro de https
        // });

        return res.json({token, expiresIn})
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"});
    }
    // console.log(req.body);
    // res.json({ok:'login'})
}

export const register = async(req, res) => {
    const {email, password} = req.body;
    try {
        
        //Alternativa buscando por defecto
        let user = await User.findOne({email:email});
        
        if(user) throw {code: 11000}
        
        user = new User({email:email, password:password});
        await user.save();
        //jwt token
        return res.status(200).json({ok:"Register"});
    } catch (error) {
        //Alternativa por defecto mongoose
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error:"Ya existe este usuario"});
        }
        return res.status(500).json({error:"Error de servidor"})
    }

    // //Obtenemos los errores
    // //validationResult utiliza "req" para intercepar el usuario que es el body que contiene la info y el error
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     //Codigo 400: bad request + errores
    //     return res.status(400).json({errors: errors.array()});
    // }
}

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if(!refreshTokenCookie) {
            throw new Error('No existe el token');
        }
        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        const { token, expiresIn} = generateToken(uid)
        
        return res.json({token, expiresIn})
    } catch (error) {
        console.log(error);
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

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        res.json({email: user.email, uid: user.id});
    } catch (error) {
        return res.status(500).json({error: "Error del servidor"});
    }
}

export const logout = (req, res) => {
    //Destruir la cookie, destruir la sesion;
    res.clearCookie('refreshToken');
    res.json({ok: true});
}