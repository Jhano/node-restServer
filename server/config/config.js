//objeto global que corre a lo largo de la app de node y es actulizado dependiendo del enterno en que esta corriendo
//==================
//PUERTO
//==================
process.env.PORT = process.env.PORT || 3001;


//==================
//Enterno
//==================

//para saber si estoy en desarrollo o en produccion:
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//==================
//Vencimiento del Token
//==================
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30; // creo la variable de configuracion


//==================
//SEED de autentificacion
//==================
process.env.SEED = process.env.SEED || "secret-seed-desarrollo"; // la variable en heroku es el seed y si no esta creada entonces es "secret"


//==================
//Base de datos
//==================

let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.urlDB = urlDB; //despues de .env se crea el nombre del ambiente