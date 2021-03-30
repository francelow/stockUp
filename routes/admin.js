const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// http://localhost:3000/admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// http://localhost:3000/admin/products => GET
router.get('/products', adminController.getProducts);

// http://localhost:3000/admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// http://localhost:3000/admin/edit-product/603f0972fe19b255c03f87ec?edit=true => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
