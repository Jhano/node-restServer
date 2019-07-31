require("./config/config"); // requiere el puerto que viene de config// no se necesita exportar el archivo porque el puerto se guarda en el objeto global process

const express = require("express");
const app = express(); //app se vuelve un objeto con la informacion de express
const bodyParser = require("body-parser"); //serializa lo que hay en x-www-form.urlencoded y lo transforma en un objeto json que es mas facil de utilizar
 
/*app.use son Middliware: Una funcion que se disparan cada vez que pasa por aqui el codigo (cada peticion que hagamos pasa siempre por estas lineas) */
//parse aplication/x-www-form.urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse aplication/json
app.use(bodyParser.json());

//tipos de peticiones
app.get("/usuarios", (req, res) =>{
    res.json("get usuario");
})

//peticion post es para crear nuevos registros
app.post("/usuarios", (req,res) => {

    let body = req.body; //ese body aprece cuando el bodyParse procese cualquier payload que reciban las peticiones
  
    if(body.nombre === undefined){
        //asi puedo decirle al usuario el error o estado de la peticion realizada
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        }); //el estado de la peticion si es que no encuentra un usuario (400 indica bad request(no se mando la informacion como el servicio la espera) / 200 indica todo bien)
    }else{
        res.json({
            persona: body
        });
    }
})

//peticion put para actualizar los registrso de usuario
app.put("/usuarios/:id", (req,res)=>{

    let id = req.params.id;//solicita (req) los parametros y busca el de id
    

        res.json({
            id
        });
    

})

//peticion de delete; ya no se acostumbra a borrar registro, si no cambiar el estado de un elemento (ej: disponible/nodisponible)
app.delete("/usuarios", (req,res)=>{S
    res.json("delate usuario");
})



app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", 8080);
});