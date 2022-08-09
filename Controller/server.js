const http = require('http');
var express = require("express");
var path = require("path");
var server = express(); // express.createServer();
var Product = require('./models/products');
var mongoose = require('mongoose');
var db = require('../Model/db');
var fun = require('../Model/functions');
var msgs = [];
mongoose.connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/WebProject');
mongoose.connection.on('connected', () => {
    console.log("Connection Successful!");
});


var public = path.join("C:/Users/user/Desktop/update/WebProject/View/public");
server.use("/", express.static(public));
server.use(express.static('../View/public/images'));

server.get('/catalogarr', async (req, res) => {
    const pro = await Product.find({});
    res.json(pro);

});
server.get('/catalog', (req, res) => {
    res.sendFile(public + "/catalog.html");
});
server.get('/add', (req, res) => {
    db.addProduct();
    res.send("hello");
});



server.get("/message", function(request, response){
	msgs.push({ usename : request.query.uname, message:  request.query.mes});
	response.json(msgs);
});

server.get("/chat", function(request, response){
	response.json(msgs);
});


// server.get("/chat", function(request, response){
//     response.sendfile(public + "/chat.html");
// });

server.listen(8080);
