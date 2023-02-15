
const dbProductManager = require("../dao/mongoManager/dbProductManager");
const Products = new dbProductManager();
const dbCartManager = require("../dao/mongoManager/dbCartManager");
const Carts = new dbCartManager()


const createCarts = async (req, res) => {
  const cart = req.body
  const Createcart = await Carts.createCarts(cart);
  if (!Createcart.error) {
    res.json(Createcart)

  } else {
    res.json(Createcart)
  }
}

const dbGetCartId = async (req, res) => {
  const id = req.params.cid
  const cart = await Carts.getCartsId(id);
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const dbGetCart = async (req, res) => {
  const cart = await Carts.getCarts();
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const product = await Products.getProductId(pid);
  if (product) {
    const respuesta = await Carts.addProductToCarts(cid,product);
    return(product)
  }else{
    res.json(product)
  }
}

module.exports = { createCarts, dbGetCart, dbGetCartId, addProductToCart};