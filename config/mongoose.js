const mongoose = require('mongoose')

let url = "mongodb+srv://danrango:testforproyecto0012@cluster0.y9stk.mongodb.net/advancedweb3?retryWrites=true&w=majority"

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)

mongoose.connect(url)

let db = mongoose.connection

db.on("error", console.error.bind(console, "Mongo connection error"))

module.exports = db 