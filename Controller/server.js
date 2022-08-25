const http = require('http');
var express = require("express");
var path = require("path");
var server = express(); // express.createServer();
var Product = require('./models/products');
var mongoose = require('mongoose');
var db = require('../Model/db');
var app = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(app);
mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
mongoose.connection.on('connected', () => {
    console.log("Connection Successful!");
});
var public = path.join("C:/Users/97252/Desktop/project/WebProject1/View/public");
server.use("/", express.static(public));
server.use(express.static('../View/public/images'));

server.get('/catalogarr', async (req, res) => {
    const pro = await Product.find({});
    res.json(pro);

});
/* --------Group By Query---------*/
server.get('/groupbycompany', async (req, res) => {//GroupByCompany Query
    const group = await Product.aggregate([
        { "$group": { _id: "$company", count: { $sum: 1 } } }
    ]).sort({ count: -1 });
    res.json(group);
});
server.get('/groupbysize', async (req, res) => {//GroupBySize Query
    const group = await Product.aggregate([
        { "$group": { _id: "$size", count: { $sum: 1 } } }
    ]).sort({ count: -1 });
    res.json(group);
});
server.get('/groupbycategory', async (req, res) => {//GroupByCategory Query
    const group = await Product.aggregate([
        { "$group": { _id: "$category", count: { $sum: 1 } } }
    ]).sort({ count: -1 });
    console.log(group);
    res.json(group);
});
var bodyParser = require('body-parser');
const Shopping = require('./models/shoppings');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.post('/form', (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 
    var user_name = req.body.user;
    var product_id = req.body.productId;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var company = req.body.company;
    var category = req.body.category;
    var gender = req.body.gender;
    //console.log(user_name + " " + product_id + " " + price + " " + quantity + " " + category + " " + gender);
    db.addShopping(user_name, product_id, company, price, quantity, category, gender);
    res.end("yes");
});
server.get('/offer', async (req, res) => { //Get request - After Buy now made Group by to Suggest the best Offer based on Id then price, gender, category
    const pro = await Shopping.aggregate(
        [
            {
                $group:
                {
                    _id: "$ClientId",
                    MaxSaleAmount: { $max: { $multiply: ["$price", "$quantity"] } },
                    avgCategory: { $sum: "$category" },
                    avgGender: { $sum: "$gender" }
                },

            }
        ]);
    //console.log(pro);
    res.json(pro);
});
server.post('/update', (req, res) => { //Post Request - Update Button on Admin page
    var id = req.body.id;
    var company = req.body.company;
    var price = req.body.price;
    var color = req.body.color;
    var size = req.body.size;
    var category = req.body.category;
    var gender = req.body.gender;
    var image = req.body.image;
    db.UpdateProduct(id, company, price, color, size, gender, category, image);
    res.end("yes");
});
server.post('/addproduct', (req, res) => { //Post Request - Add Button on Admin page
    var company = req.body.company;
    var price = req.body.price;
    var color = req.body.color;
    var size = req.body.size;
    var category = req.body.category;
    var gender = req.body.gender;
    var image = req.body.image;
    db.addProduct(company, price, color, size, gender, category, image);
    res.end("yes");
});
server.post('/deleteproduct', (req, res) => {//Post Request - Delete Button on Admin Page
    var id = req.body.id;
    db.deleteProduct(id);
});
//------Socket IO on Chat Page-------
var usernames = {};//usernames array
io.sockets.on('connection', function (socket) {
    console.log("connect1");
    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        console.log("sendCHAT1");
        // we tell the client to execute 'updatechat' with 2 parameters
        io.sockets.emit('updatechat', socket.username, data);
    });
    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function (username) {
        console.log("adduser1");
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
        // update the list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
    });
    socket.on('disconnect', function () {
        console.log("disconnect");
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });
});
app.listen(8080);
