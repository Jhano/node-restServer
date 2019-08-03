//objeto global que corre a lo largo de la app de node y es actulizado dependiendo del enterno en que esta corriendo
//==================
//PUERTO
//==================
process.env.PORT = process.env.PORT || 8080;


//==================
//Enterno
//==================

//para saber si estoy en desarrollo o en produccion:
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//==================
//Base de datos
//==================

let urlDB;

// if (process.env.NODE_ENV === "dev") {
//     urlDB = "mongodb://localhost:27017/cafe";
// } else {
urlDB = "mongodb+srv://jano:AdaNP55MNXNb90AB@cluster0-ehy8n.mongodb.net/cafe";
// }
process.env.urlDB = urlDB; //despues de .env se crea el nombre del ambiente