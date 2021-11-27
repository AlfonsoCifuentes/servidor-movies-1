//Requiriendo mongoose para su uso
const mongoose = require("mongoose");
//Guardando el esquema de mongoose como una const
const Schema = mongoose.Schema;
//Definiendo la plantilla (esquema) de mongoose
const movieSchema = new Schema(
    {
        "title":        {type: String},
        "director":     {type: String},    
        "year":         {type: Number},
        "genre":        {type: String},
    },
    {
        timestamps: true
    }
)
//Guardando el modelo de Movie
const Movie = mongoose.model ("Movie", movieSchema);
//Exportando el modelo de Movie
module.exports = Movie;