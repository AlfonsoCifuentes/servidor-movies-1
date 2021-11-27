//Requiriendo el módulo db
require ("./db/db");
//Requiriendo express
const express = require("express");
//Requiriendo el router de películas:
const moviesRouter = require("./router/movies.router");
//Definiendo express como server
const server = express();
//Definiendo el puerto a usar en la conexión
const PORT = 3000;

server.use ("/movies", moviesRouter);

server.use ("*", (req, res) => {
    res.status(404).json("No se ha encontrado");
})



//Añadiendo un listener al puerto, y un console log para confirmar
server.listen(PORT, () => {
    console.log (`Servidor arrancado en el puerto ${PORT}`)
})