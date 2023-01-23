const ProductManager = require("../ProductManager");
const { emitDeleteProduct, emitaddRealtime } = require("../utils/socket.io");
const Product = new ProductManager("./src/assets/product.json");

const views = async (req, res) => {
  let products = await Product.getProducts();
  res.render("home", {
    products,
  });
};

const realTimeProduct = async (req, res) => {
  res.render("realTimeProducts");
};

const deleteRealTimeProduct = async (req, res) => {
  const id = req.params.pid;
  const Delete = await Product.deleteProduct(id);

  if (Delete.erro) {
    res.json(Delete);
  } else {
    emitDeleteProduct(id);
    res.json(Delete);
  }
};

const addRealTimeProduct = async (req, res) => {
  const body = req.body;

  const add = await Product.addProduct(body);
  if (add.erro) {
    res.json(add);
  } else {
    emitaddRealtime(add);
    res.json(add);
  }
};

module.exports = {
  views,
  realTimeProduct,
  deleteRealTimeProduct,
  addRealTimeProduct,
};
