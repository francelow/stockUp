const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// http://localhost:3000/ => GET
router.get('/', shopController.getIndex);

// http://localhost:3000/products => GET
router.get('/products', shopController.getProducts);

// http://localhost:3000/products/603f09c9fe19b255c03f87ed => GET
router.get('/products/:productId', shopController.getProduct);

// http://localhost:3000/cart => GET
router.get('/cart', shopController.getCart);

// http://localhost:3000/cart => POST
router.post('/cart', shopController.postCart);

// http://localhost:3000/cart-delete-item => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// http://localhost:3000/create-order => POST
router.post('/create-order', shopController.postOrder);
// http://localhost:3000/orders => GET
router.get('/orders', shopController.getOrders);

module.exports = router;
