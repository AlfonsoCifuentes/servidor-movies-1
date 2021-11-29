//Requiriendo mongoose para su uso
const mongoose = require("mongoose");
//Guardando el esquema de mongoose como una const
const Schema = mongoose.Schema;
//Definiendo la plantilla (esquema) de mongoose
const cinemaSchema = new Schema(
    {
        "name":     {type: String, required: true},
        "location": {type: String, required: true},    
        "movies":   [{type: mongoose.Types.ObjectId, ref:"Movie"}]
        
    },
    {
        timestamps: true
    }
)
//Guardando el modelo de Cinema
const Cinema = mongoose.model ("Cinema", cinemaSchema);
//Exportando el modelo de Cinema
module.exports = Cinema;