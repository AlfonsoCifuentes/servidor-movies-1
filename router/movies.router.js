//Requiriendo express, modelo de Movie y router
const express = require ("express");
const Movie = require ("../models/Movie");
const router = express.Router();

//GET de todas las películas

router.get ("/", (req, res) => {
    //Obteniendo todas las películas con Movie.find //
    Movie.find()
        //Mandando un response con las películas en JSON
        .then((movies) => {
            return res.json(movies);
        })
        //Capturando el error en un catch si no funciona:
        .catch ((error) => {
            console.error ("Error en GET / ", error);
            return res.status(500).json("Ha ocurrido un error en el servidor");
        })
});

//GET película según su _id:
router.get ("/:id", (req, res) => {
    //Requiriendo el parámetro id y almacenándolo en una variable
    const id = req.params.id;
    //Encontrando una película por id
    Movie.findById(id)
    //Mandando entonces la respuesta con la película solicitada en json
    .then (movie => {
        if (!movie ){
            return res.status(404).json("No se ha encontrado la película");
        }
        return res.json(movie)
    })
    //Capturando el error en un catch si no funciona:
    .catch (error => {
        console.error (`Error en GET/${id}`, error);
        return res.status(500).json("Ha habido un error en el servidor");
    })
});

//GET película por título

router.get("/title/:title", (req, res) => {
    const tituloSolicitado = req.params.title;
    return Movie.find({title: tituloSolicitado})
    .then ((movies) => {
        return res.json(movies);
    })
    .catch ((error) => {
        console.error (`Error en GET /title/${title}`, error);
        return res.status(500).json("Ha habido un error en el servidor");
    })
});

//GET película por género

router.get("/genre/:genre", (req, res) => {
    const generoSolicitado = req.params.genre;
    return Movie.find({genre: generoSolicitado})
    .then ((movies) => {
        return res.json(movies);
    })
    .catch ((error) => {
        console.error (`Error en GET /genre/${genre}`, error);
        return res.status(500).json("Ha habido un error en el servidor");
    })
});

//GET películas estrenadas a partir de una fecha indicada

router.get("/newerthan/:year", (req, res) => {
   const yearSolicitado = req.params.year;
    return Movie.find({year: {$gt: yearSolicitado}})
    .then ((movies) => {
        return res.json(movies);
    })
    .catch ((error) => {
        console.error (`Error en GET /year/${year}`, error);
        return res.status(500).json("Ha habido un error en el servidor");
    })
});

//Exportando el módulo router

module.exports = router;


