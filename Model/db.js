var mongoose = require('mongoose');
const Shopping = require('../Controller/models/shoppings');
var Product = require('../Controller/models/products');
var ObjectId = require('mongodb').ObjectId;

var addProduct = function (val1, val2, val3, val4, val5, val6, val7) {
    mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
    mongoose.connection.on('connected', () => {
        console.log("Connection Successful!");
    });
    var product1 = new Product({ company: val1, price: val2, color: val3, size: val4, gender: val5, category: val6, imageUrl: val7 });
    product1.save();
    console.log(product1);
    mongoose.disconnect();
}
var addShopping = function (val1, val2, val3, val4, val5, val6, val7) {
    mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
    mongoose.connection.on('connected', () => {
        console.log("Connection Successful!");
    });
    var product1 = new Shopping({ ClientId: val1, ProductId: val2, Company: val3, price: val4, quantity: val5, category: val6, gender: val7 });
    product1.save();
    console.log(product1);
    mongoose.disconnect();
}
var UpdateProduct = function (val1, val2, val3, val4, val5, val6, val7, val8) {
    mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
    mongoose.connection.on('connected', () => {
        console.log("Connection Successful!");
    });
    console.log("hello!" + val1 + "!!!");
    Product.findOne({ _id: val1 }, function (err, product) {
        if (!err) {
            console.log(product.price);
            product.company = val2;
            product.price = val3;
            product.color = val4;
            product.size = val5;
            product.gender = val6;
            product.category = val7;
            product.imageUrl = val8;
            console.log(product.price);

            product.save(function (err) {
                if (!err) {
                    console.log("Updated!");
                }
                else {
                    console.log("Error: could not save");
                }
            });
        }
    });
    mongoose.disconnect();
}
var deleteProduct = function (id) {
    mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
    mongoose.connection.on('connected', () => {
        console.log("Connection Successful!");
    });
    Product.deleteOne({ _id: id }, function (err, product) {
    });
    mongoose.disconnect();
}
exports.addProduct = addProduct;
exports.addShopping = addShopping;
exports.UpdateProduct = UpdateProduct;
exports.deleteProduct = deleteProduct;