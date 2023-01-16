
const express = require('express');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes')

const server = express();
const port = 8080;

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);

server.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})