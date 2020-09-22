//Modelo del usuario de la base de datos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    username: String,
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const model = mongoose.model('User',mySchema);
module.exports = model;