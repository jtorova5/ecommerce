
const ProductManager = require("../dao/fsManager/ProductManager");
const Product = new ProductManager('./assets/product.json');
const { emitDeleteProduct } = require("../utils/socket.io");
const { emitaddRealtime } = require("../utils/socket.io");

const views = async (req, res) => {
    let products = await Product.getProducts();
    res.render("home", {
        products
    });
}

const realTimeProduct = async (req, res) => {
    res.render('realTimeProducts')
}

const deleteRealTimeProduct = async (req, res) => {
    const id = +req.params.pid
    const Delete = await Product.deleteProduct(id);
    if (Delete.erro) {
        res.json(Delete);
    } else {
        emitDeleteProduct(id)
        res.json(Delete);
    }
}

const addRealTimeProduct = async (req, res) => {
    const body = req.body;
    const add = await Product.addProduct(body);
    if (add.erro) {
        res.json(add)
    } else {
        emitaddRealtime(add)
        res.json(add);
    }
}

const renderChats = (req, res) => {
    res.render('chats')
}

module.exports = {views, realTimeProduct, deleteRealTimeProduct, addRealTimeProduct, renderChats}