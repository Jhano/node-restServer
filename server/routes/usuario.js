//============================================
//Peticiones de Usuario
//============================================


const express = require("express");
const Usuario = require("../models/usuario");
const { verificaToken, verificaAdmin_Role } = require("../middlewares/autentificacion");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const app = express();



//tipos de peticiones
//verificaToken siempre se ejecuta cuando se ejecute la peticion get, ya que los middleware siempre se ejecutan
app.get("/usuarios", verificaToken, (req, res) => {

    // //el usuario que esta haciendo la verificacion
    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // })

    //esta linea guarda los parametros opcionales//van despues de este signo ? en el url; ej: localhost:8080/usuarios?desde=5
    let desde = req.query.desde || 0; //query es donde caen los parametros opcionales en el req y puedo suponer que vendra un variable desde
    //desde = parseInt(desde);
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, "nombre email role estado google img") //find (funcion de mongoose)filtra los usuario y lo que va dentro de {} son las opciones ej: filtrar solo los que tengan google:true //el segundo argumneto, son los campos o propiedades que queremos mostrar despues de hacer el filtrado 
        .skip(desde) // se salta la cantidad que va en parantesis y muetras los registros acontinuacion del salto
        .limit(limite) //ñimite que indica la cantidad de registros que filtro
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.count({ estado: true }, (err, countUsuarios) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: countUsuarios
                })
            }); //cuenta registros // recibe como condicion la misma del find // y como segundo parametro es el callbakck


        }) //exc() (funcion de mongoose) es ejecución por lo tanto esto dice que ejecute find
})


//peticion post es para crear nuevos registros
app.post("/usuarios", [verificaToken, verificaAdmin_Role], (req, res) => {



    let body = req.body; //ese body aprece cuando el bodyParse procese cualquier payload que reciban las peticiones

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //bcrpt.hashSync, hace el hash de forma sincrona (sin promesa, sin callback; lo hace directamente)// lo que quiero encriptar, y el numero de salto que vendria siendo la cantidad de vecs encriptada 
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

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })




})

//peticion put para actualizar los registrso de usuario
app.put("/usuarios/:id", [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id; //solicita (req) los parametros y busca el de id
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]); //pick una funcion de la libreria underscore filtra un objeto y solo acepta las propiedades que yo decido en el arreglo


    //encontrar usuario en DB por medio del id //findById un metodo de mongoose //findByIdAndUpdate metodo de mongoose que busca por id y actualiza
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //el id que recibe en la peticion(url), el body entero (el objeto que queremos actualizar) y el callback que me regresa un error o el usuarioDB con el id que coincida
        //new es un OBJETO Y es la opcion (el tercer parametro de la funcion) que su funcion es regresar el documneto o tabla actualizada y no el origial (asi le puedo mostrar al usuario el cambio realizado)   
        //runValidators, se encarga de respetar las validaciones puestan en el Schema de usuario

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
                message: "El id ingresado no existe"
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })



})

//peticion de delete; ya no se acostumbra a borrar registro, si no cambiar el estado de un elemento (ej: disponible/nodisponible)
app.delete("/usuarios/:id", [verificaToken, verificaAdmin_Role], (req, res) => {




    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    };
    //let body = _.pick(req.body, "estado")
    //============================================
    //Borra el usuario fisicamente
    //============================================
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err,
    //             message: "El id ingresado no existe"
    //         })
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             error: {
    //                 message: "Usuario no encontrado"
    //             }
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // })


    //============================================
    //ACTUALIZAR EL ESTADO DEL USUARIO
    //============================================
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, runValidators: true }, (err, usuarioStatus) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
                message: "El id ingresado no existe"
            })
        }

        res.json({
            ok: true,
            usuario: usuarioStatus
        })
    })
})


module.exports = app; // exporto el archivo app que contiene todas las peticiones // tiene configuraciones sobre esas rutas