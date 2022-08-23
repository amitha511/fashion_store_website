const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    company: {
        type: String
    },
    price: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    gender: {
        type: String
    },
    category: {
        type: String,
        enum: ['t-shirt', 'plaid']
    },
    imageUrl: {
        type: String
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;