import jwt from "jsonwebtoken"


export const generateToken = (uid) => {
    try {
        //Token valida cada peticion al servidor que se haga cada 15 minutos
        const expiresIn = 60 * 15;
        const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET, { expiresIn: expiresIn });
        return { token: token, expiresIn: expiresIn }


    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30
    try {
        const refreshToken = jwt.sign({ uid: uid }, process.env.JWT_REFRESH, { expiresIn: expiresIn });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO == "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error);
    }
}

export const tokenVerificationErrors = {
    "invalid signature":"La firma del jwt no es valida",
    "jwt expired":"JWT expirado",
    "jwt expired":"Token no valido",
    "No Bearer":"Utiliza formato Bearer",
    "jwt malformed":"JWT formato no valido"
}
