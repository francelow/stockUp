const mongodb = require('mongodb');
const Product = require('../models/product');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  //console.log("OVER HERE!!!");
  //console.log(req.body);
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null, req.user);
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.status(200);
      res.redirect('/admin/products');
      
    })
    .then(()=>{
      
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  console.log("See here!!");
  console.log(req.body);
  var prodId = 0;
  if (req.body._id == null){
    prodId = req.body.productId;
  }else{
    prodId = req.body._id;
  }
  
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageURL,
    new ObjectId(prodId)
  );
  product
    .save()
    .then(result => {
      console.log('Product Updated !');
       res.status(200);
       res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  var prodId = 0;
  if (req.body._id == null){
    prodId = req.body.productId;
  }else{
    prodId = req.body._id;
  }
  Product.deleteById(prodId)
  .then(() => {
    console.log('Product deleted successfully!');
    res.status(200);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};
