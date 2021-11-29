//Requiriendo el módulo db
require ("./db/db");
//Requiriendo express
const express = require("express");
//Requiriendo el router de películas:
const moviesRouter = require("./router/movies.router");
//Requiriendo el router de cines:
const cinemasRouter = require("./router/cinemas.router");
//Definiendo express como server
const server = express();
//Definiendo el puerto a usar en la conexión
const PORT = 3000;

//Middlewares para los JSON bodies
server.use(express.json());
server.use(express.urlencoded({extended: false}));

//Middlewares de enrutado

server.use ("/movies", moviesRouter);
server.use ("/cinemas" , cinemasRouter);

//Enrutado para rutas no existentes:
server.use ("*", (req, res, next) => {
    const error = new Error("No se ha encontrado la ruta especificada");
    error.status = 404;
    next(error);
});

//Middleware de control de errores

server.use ((err, req, res, next) => {
    console.error ("ERROR - Ha ocurrido un error:", err.status, err.message);
    return res.status(err.status || 500).json(err.message || "Ha habido un error en el servidor");
});

//Añadiendo un listener al puerto, y un console log para confirmar
server.listen(PORT, () => {
    console.log (`Servidor arrancado en el puerto ${PORT}`)
});