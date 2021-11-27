//Requiriendo mongoose para su uso
const mongoose = require ("mongoose");
//Definiendo la URL de la base de datos
const DB_URL = "mongodb://localhost:27017/servidor-movies-1";
//Conectando el servidor a la base de datos
const dbConnection = mongoose.connect (DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Exportando la función de conexión a la base de datos
module.exports = dbConnection;