//Requiriendo express, modelo de Movie y router
const express = require ("express");
const Movie = require ("../models/Movie");
const router = express.Router();

//GET de todas las películas

router.get ("/", (req, res, next) => {
    //Obteniendo todas las películas con Movie.find //
    Movie.find()
        //Mandando un response con las películas en JSON
        .then((movies) => {
            return res.json(movies);
        })
        //Capturando el error en un catch si no funciona:
        .catch ((error) => {
            const errorHappened = new Error();
            return next(errorHappened);
        })
});

//GET película según su _id:
router.get ("/:id", (req, res, next) => {
    //Requiriendo el parámetro id y almacenándolo en una variable
    const id = req.params.id;
    //Encontrando una película por id
    Movie.findById(id)
    //Mandando entonces la respuesta con la película solicitada en json
    .then (movie => {
        if (!movie ){
            const error = new Error (`La película con id: ${_id} no se ha encontrado`);
            error.status = 404;
            return next(error);
        }
        return res.json(movie)
    })
    //Capturando el error en un catch si no funciona:
    .catch (error => {
            return next(new Error());
    })
});

//GET película por título

router.get("/title/:title", (req, res, next) => {
    const tituloSolicitado = req.params.title;
    return Movie.find({title: tituloSolicitado})
    .then ((movie) => {
        if (movie == !tituloSolicitado ){
            const error = new Error (`La película con título: ${tituloSolicitado} no se ha encontrado`);
            error.status = 404;
            return next(error);
        }
        return res.json(movie);
    })
    .catch ((error) => {
        return next (new Error());
    })
});

//GET película por género

router.get("/genre/:genre", (req, res, next) => {
    const generoSolicitado = req.params.genre;
    return Movie.find({genre: generoSolicitado})
    .then ((movie) => {
        if (movie == !generoSolicitado ){
            const error = new Error (`No se ha encontrado ninguna película de género ${generoSolicitado} `);
            error.status = 404;
            return next(error);
        }
        return res.json(movie);
    })
    .catch ((error) => {
        return next (new Error());
    })
});

//GET películas estrenadas a partir de una fecha indicada

router.get("/newerthan/:year", (req, res, next) => {
   const yearSolicitado = req.params.year;
    return Movie.find({year: {$gt: yearSolicitado}})
    .then ((movies) => {
        return res.json(movies);
    })
    .catch ((error) => {
        return next (new Error());
    })
});

//POST para crear una nueva película
router.post("/", (req, res, next) => {
    const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre:req.body.edad
    });

    newMovie.save()
        .then (() => {
            return res.status(201).json(newMovie);
        })
        .catch ((error) => {
            next(error);
        })
})

//PUT para modificar una película
router.put ("/:id", (req, res, next) => {
    const movieId = req.params.id;
    const newMovie = new Movie(req.body);
    newMovie._id = movieId;
    Movie.findByIdAndUpdate(movieId, newMovie, { new: true})
        .then(updatedMovie => {
            res.status(200).json(updatedMovie);
        })
        .catch(error => {
            next(error);
        })
});

//DELETE para eliminar una película
router.delete ("/:id", (req, res, next) => {
    const movieId = req.params.id;
    Movie.findByIdAndDelete(movieId)
        .then (() => {
            return res.status(200).json(`Se ha eliminado la película con id: ${movieId}`);
        })
        .catch (error => {
            next(error);
        })
})

//Exportando el módulo router

module.exports = router;


