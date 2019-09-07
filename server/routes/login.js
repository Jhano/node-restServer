const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");
const app = express();



app.post("/login", (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            //internal error server(500)
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }

        //comparo la contraseña de la base de datos con la que esoty pasadno en el body.password
        //en otras palabras encripta la del body.password y ve si hace match con la de la bd
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }


        //creando el token
        //primeor el payload, luego el secret(que es para comparan el token con el que esta en la BD), y luego el tiempo en que experia el token
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })



        res.json({
            ok: true,
            usuarioDB,
            token
        })


    })
})










module.exports = app;