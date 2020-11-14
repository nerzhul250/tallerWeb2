const User = require('../models/users')

exports.index = function (req, res, next) {
    console.log('Starting searchiiiiiing')
    User.find({}, (err, users) => {
        if (err){
            console.log(err)
            return next(err)
        }
        res.send(users)
    })
}

exports.show = function (req, res, next) {
    User.find(function (err, users) {
        if (err) return console.error(err);
        res.send(users)
    })
}

exports.create = function (req, res, next) {
    console.log(req.body)
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        identification: req.body.identification,
        photo: req.body.photo,
        active: req.body.active,
        password: req.body.password
    })

    newUser.save(function (err, newUser) {
        if (err) return next(err);
        console.log('A FUCKING USER HAS BEEN SAVED')
        res.send('A user has been saved successfully')
    })
}