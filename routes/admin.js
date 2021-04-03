const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const authPage = require('../middleware/auth_page');

const router = express.Router();

// http://localhost:3000/admin/add-product => GET
router.get('/add-product',authPage, adminController.getAddProduct);

// http://localhost:3000/admin/products => GET
router.get('/products',authPage ,adminController.getProducts);

// http://localhost:3000/admin/add-product => POST
router.post('/add-product',authPage, adminController.postAddProduct);


// http://localhost:3000/admin/edit-product/603f0972fe19b255c03f87ec?edit=true => GET
router.get('/edit-product/:productId',authPage, adminController.getEditProduct);

router.post('/edit-product',authPage, adminController.postEditProduct);

router.post('/delete-product',authPage, adminController.postDeleteProduct);

router.get('/dashboard',authPage, adminController.getDashboard);

module.exports = router;
