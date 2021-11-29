//Requiriendo express, modelo de Cinema y router
const express = require ("express");
const Cinema = require ("../models/Cinema");
const router = express.Router();

//GET de todos los cines

router.get ("/", (req, res, next) => {
    //Obteniendo todos los cines con Cinema.find //
    Cinema.find().populate("movies")
        //Mandando un response con los cines en JSON
        .then((cinemas) => {
            return res.json(cinemas);
        })
        //Capturando el error en un catch si no funciona:
        .catch ((error) => {
            const errorHappened = new Error();
            return next(errorHappened);
        })
});

//GET cine según su _id:
router.get ("/:id", (req, res, next) => {
    //Requiriendo el parámetro id y almacenándolo en una variable
    const id = req.params.id;
    //Encontrando un cine por id
    Cinema.findById(id).populate("movies")
    //Mandando entonces la respuesta con el cine solicitado en json
    .then (cinema => {
        if (!cinema ){
            const error = new Error (`La sala de cine con id: ${_id} no se ha encontrado`);
            error.status = 404;
            return next(error);
        }
        return res.json(cinema)
    })
    //Capturando el error en un catch si no funciona:
    .catch (error => {
            return next(new Error());
    })
});

//GET cine por nombre

router.get("/name/:name", (req, res, next) => {
    const cineSolicitado = req.params.name;
    return Cinema.find({name: cineSolicitado})
    .then ((cinemas) => {
        return res.json(cinemas);
    })
    .catch ((error) => {
        return next (new Error());
    })
});

//GET cine por ubicación

router.get("/location/:location", (req, res, next) => {
    const cineSolicitado = req.params.location;
    return Cinema.find({location: cineSolicitado})
    .then ((cinemas) => {
        return res.json(cinemas);
    })
    .catch ((error) => {
        return next (new Error());
    })
});


//POST para crear un nuevo cine
router.post("/", (req, res, next) => {
    const newCinema = new Cinema({
        name: req.body.name,
        location: req.body.location
        
    });

    newCinema.save()
        .then (() => {
            return res.status(201).json(newCinema);
        })
        .catch ((error) => {
            next(error);
        })
})

//PUT para modificar un cine
router.put ("/:id", (req, res, next) => {
    const cinemaId = req.params.id;
    const newCinema = new Cinema(req.body);
    newCinema._id = cinemaId;
    Cinema.findByIdAndUpdate(cinemaId, newCinema, { new: true})
        .then(updatedCinema => {
            res.status(200).json(updatedCinema);
        })
        .catch(error => {
            next(error);
        });
});

//PUT para añadir una película al cine
router.put ("/:id/movies", (req, res, next) => {
    const cinemaId = req.params.id;
    const movieId = req.body.movieToAdd;
    
    Cinema.findByIdAndUpdate(
        cinemaId,
        {$push: {movies: movieId}},
        {new: true }
    )
        .then(updatedCinema => {
            res.status(200).json(updatedCinema);
        })
        .catch(error => {
            next(error);
        });
});

//DELETE para eliminar un cine
router.delete ("/:id", (req, res, next) => {
    const cinemaId = req.params.id;
    Cinema.findByIdAndDelete(cinemaId)
        .then (() => {
            return res.status(200).json(`Se ha eliminado el cine con ID: ${cinemaId}`);
        })
        .catch (error => {
            next(error);
        });
});

//Exportando el módulo router

module.exports = router;

