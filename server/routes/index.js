const express = require("express");
const app = express();



//se declaran las rutas// para cuando se hacen las peticiones
app.use(require("./usuario"));
app.use(require("./login"));


module.exports = app;