//============================================
//archivo encargado del modelo de datos
//============================================

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"], //valores validos
    message: "{VALUE} no es un rol valido" //el value es el valor que manda el usuario {funicona para una variable}
}

//cascaron para crear esquemas de mongoose
let Schema = mongoose.Schema;

//nuevo Schema
let usuarioSchema = new Schema({
    nombre: {
        //restricciones
        type: String,
        required: [true, "El nombre es necesario"] //mensaje cuando la condicion no se cumple
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: { // si el usuario no se crea el perfil con google esta propiedad estara en false
        type: Boolean,
        default: false
    }

}); //se le definen las reglas o controles del usuario //los datos de la tabla usuario

//====================================================================================================================================
//usuarioSchema no es un objeto por eso no puede hacer eso: usuarioSchema.password para acceder a la contreñsa
//====================================================================================================================================

//modificando password del esquema para no mostrar en la salida al usuario.
usuarioSchema.methods.toJSON = function() { //en el metodo toJSON en un Schema siempre se llama cuando se intenta imprimir (como ahora que mandamos todo el Schema a una impresion mediante JSON)
    let user = this; //es una funcion normal para poder usar THIS // y guarda todo lo de userSchema en user
    let userObject = user.toObject(); //transforma user que contiene todo lo de userSchema, en un objeto y luego guardo ese objeto en userObject
    delete userObject.password; //como ahora userObject es un objeto puedo acceder a su propiedad password y borrarlo. 

    return userObject; //lo retorno y ahora lo que se imprime es usuarioSchema pero sin el password poreque usuarioSchema=userObject (no se cambia en la bd, esto solo afecta a lo que imprime en el JSON )
}

usuarioSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico" //el plugin se encarga de validar el campo que tiene unique
})

module.exports = mongoose.model("usuario", usuarioSchema); //el modelo se llama usuario y el usuario va tener las configuraciones de usuarioSchema // guarda el campo en PATH