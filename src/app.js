
const express = require('express');
const { Server } = require('socket.io');
const { connectionSocket } = require('./utils/socket.io')
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cartsRoute = require('./routes/carts.routes')
const productsRouteDB = require('./routes/products.routes.db')
const cartsRouteDB = require('./routes/carts.routes.db')
const viewRoute = require('./routes/views.routes')
const chatsRoute = require('./routes/chats.routes')
const server = express();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

let port = 8080;

const httpServer = server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

//handlebars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

//express
server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//routes
server.use("/api/products/", productsRoute);
server.use("/api/carts/", cartsRoute);
server.use("/", viewRoute);
server.use("/api/productsDB/", productsRouteDB);
server.use("/api/cartsDB/", cartsRouteDB);
server.use("/api/chats/", chatsRoute);

//Connection with MongoDB Atlas Database
mongoose.connect('mongodb+srv://admin:123@codercluster.ew29ctl.mongodb.net/?retryWrites=true&w=majority',
    (error) => {
        if (error) {
            console.log('Error connecting with MongoDB Atlas', error);
            process.exit();
        } else {
            console.log('Successfully connected with MongoDB Atlas');
        }
    })
connectionSocket(httpServer);