var mongoose = require('mongoose')
var Product = require('../Controller/models/products');


var addProduct = function () {
    mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
    mongoose.connection.on('connected', () => {
        console.log("Connection Successful!");
    });
    var product1 = new Product({ company: "Burberry", price: '800', color: 'pink', size: 'M', gender: 'female', category: 't-shirt', imageUrl: 'https://images.stockx.com/images/Burberry-Womens-Oversized-Tucson-Print-T-shirt-Pink.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1654121015&q=75' });
    product1.save();
    console.log(product1);
}
exports.addProduct = addProduct;
