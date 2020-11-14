const Product = require('../models/products')

exports.index = function(req, res, next){
    Product.find({}, (err, products) => {
        if (err)
            return next(err)
        res.send(products)
    })
}

exports.create = function(req, res, next) {

    let product = new Product ({
        name: req.body.name,
        price: req.body.price
    }
    );

    product.save(err => {
        if (err)
            return next(err)
        res.send("Product created successfully.")
    })
}

exports.show = function(req, res, next) {
    Product.findById(req.params.id, (err, product) => {
        if (err)
            return next(err)
        res.send(product)
    })
}

exports.delete = function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err)
            return next(err)
        res.send("Product eliminated succesfully")
    })
}

exports.update = function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},(err, product) => {
        if (err)
            return next(err)
        res.send("Product updated succesfully")
    })
}