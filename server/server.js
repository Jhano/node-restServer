require("./config/config"); // requiere el puerto que viene de config// no se necesita exportar el archivo porque el puerto se guarda en el objeto global process



const express = require("express");
const app = express(); //app se vuelve un objeto con la informacion de express
const bodyParser = require("body-parser"); //serializa lo que hay en x-www-form.urlencoded y lo transforma en un objeto json que es mas facil de utilizar
const mongoose = require("mongoose");


/*app.use son Middliware: Una funcion que se disparan cada vez que pasa por aqui el codigo (cada peticion que hagamos pasa siempre por estas lineas) */
//parse aplication/x-www-form.urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse aplication/json
app.use(bodyParser.json());

app.use(require("./routes/usuario"));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw new Error(err);

        console.log("Base de datos Online");
    }); //mongodb: (es el protocolo)// localhost: es la definiicon delpuerto // luego viene la base de datos

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT);
});