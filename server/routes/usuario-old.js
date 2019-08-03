//============================================
//Peticiones de Usuario
//============================================


const express = require("express");
const app = express();
//const Usuario = require("../models/usuario");


//tipos de peticiones
app.get("/usuarios", (req, res) => {
    res.json("get usuario");
})


//peticion post es para crear nuevos registros
app.post("/usuarios", (req, res) => {

    let body = req.body; //ese body aprece cuando el bodyParse procese cualquier payload que reciban las peticiones

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    }); // un nuevo objeto de tipo Usuario, con los valores que debe traer el objeto


    //============================================
    //grabar los datos del objeto usuario en la bd
    //============================================

    //save: palabra reservada de mongoose para guardar los datos
    usuario.save((err, usuarioDB) => { //usuarioDB es el usuario de la DB
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

    if (body.nombre === undefined) {
        //asi puedo decirle al usuario el error o estado de la peticion realizada
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        }); //el estado de la peticion si es que no encuentra un usuario (400 indica bad request(no se mando la informacion como el servicio la espera) / 200 indica todo bien)
    } else {
        res.json({
            persona: body
        });
    }
})

//peticion put para actualizar los registrso de usuario
app.put("/usuarios/:id", (req, res) => {

    let id = req.params.id; //solicita (req) los parametros y busca el de id


    res.json({
        id
    });


})

//peticion de delete; ya no se acostumbra a borrar registro, si no cambiar el estado de un elemento (ej: disponible/nodisponible)
app.delete("/usuarios", (req, res) => {
    S
    res.json("delate usuario");
})


module.exports = app; // exporto el archivo app que contiene todas las peticiones // tiene configuraciones sobre esas rutas