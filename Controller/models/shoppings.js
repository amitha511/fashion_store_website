const mongoose = require('mongoose');
const ShoppingSchema = mongoose.Schema({
    ClientId: {
        type: String
    },
    ProductId: {
        type: String
    },
    Company: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    category: {
        type: Number
    },
    gender: {
        type: Number
    }
});
const Shopping = mongoose.model('Shopping', ShoppingSchema);
module.exports = Shopping;