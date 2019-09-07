// ====================================================================================================================================================================================================
// LOS MIDDLEWARES SIRVEN PARA CREAR UNA CONEXIÓN  EN LA APP, PARA TRASPASAR LOS DATOS || HAY MILDDWARE DE BD A BD, DE BD A PAGWEB, LAS API SON MIDDLWARE ENTRE OTROS
// ====================================================================================================================================================================================================

const jwt = require("jsonwebtoken");


// ============================
// Verificar Token
// ============================


let verificaToken = (req, res, next) => {

    let token = req.get("Token");

    //esta funcion de jwt, permite verificar si el token enviado es el mismo que el de SEED, es decir que si corresponde al de la BD
    jwt.verify(token, process.env.SEED, (err, decoded) => { //decoded: informacion decodificada // es el payload o informacion del usuario

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        //cualquier peticion puede tener acceso a la informacion del usuario con solo tener verificado el token
        req.usuario = decoded.usuario; //req.usuario es una nueva propiedad
        next(); //next continua con la ejecución del programa

    })




};


let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    let valido = true;
    if (usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            message: "Role no autorizado"
        })
    }



}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}