
const express = require('express');
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes')
const viewRoute = require('./routes/views.route')
const {connectionSocket} = require('./utils/socket.io')
const server = express();
const port = 8080;

const httpServer = server.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})

server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

server.use(express.static(__dirname+'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);

connectionSocket (httpServer);