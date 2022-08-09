const mongoose1 = require('mongoose');
const productSchema = mongoose1.Schema({
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
        enum: ['t-shirt', 'elegant', 'sport', 'plaid']
    },
    imageUrl: {
        type: String
    }
});
const Product = mongoose1.model('Product', productSchema);
module.exports = Product;