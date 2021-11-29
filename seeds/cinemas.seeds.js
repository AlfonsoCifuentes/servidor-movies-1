const mongoose = require("mongoose");
const Cinema = require("../models/Cinema");
const dbConnection = require("../db/db");

const cinemas = [
    {
        "name": "Kinepolis",    
        "location": "Ciudad de la Imagen, Madrid"   
    },
    {
        "name": "Cinesa",    
        "location": "Mendez Álvaro, Madrid"   
    }
    
];

const cinemasDocuments = cinemas.map (cinema => new Cinema(cinema));

dbConnection
    .then(async () => {
        const allCinemas = await Cinema.find();
        if (allCinemas.length > 0) {
            await Cinema.collection.drop();
        }
    })
    .catch ((error) => console.error("Error elimiando la colección Cinemas:", error))
    .then (async () => {
        await Cinema.insertMany(cinemasDocuments)
    })
    .catch((error) => console.error ("Error insertando en Cinema:", error))
    .finally(() => mongoose.disconnect());