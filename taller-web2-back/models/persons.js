const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let PersonSchema = Schema({
    firstname: {type: String, required: true, max:100},
    lastname: {type: String, required: true, max:100},
    username: {type: String, required: true, max:100, min:8},
    identification: {type: Number, required: true},
    password: {type: String, required: true, max: 100},
    photo: {type: String, required: true},
    active: {type: Boolean, required: true}
})

module.exports = mongoose.model('Person', PersonSchema)