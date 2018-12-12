const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//create
exports.product_create = function (req, res, next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// read
exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

// list
exports.product_list = function (req, res, next) {
    Product.find(function (err, products) {
        if (err) return next(err);
        res.send(products);
    })
};

// update
exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

// delete
exports.product_delete = function (req, res, next) {
    Product.findByIdAndDelete(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product deleted.');
    });
};