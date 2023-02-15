
const {Router} = require('express');
const cartsControllerDB = require('../controller/carts.controller.db')

const router =  Router();

router.post('/', cartsControllerDB.createCarts);
router.get('/', cartsControllerDB.dbGetCart);
router.get('/:cid', cartsControllerDB.dbGetCartId);
router.post('/:cid/product/:pid', cartsControllerDB.addProductToCart);

module.exports = router;