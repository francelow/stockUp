const product = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.status(200);
      res.redirect('/admin/products');
      
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
  console.log(req.user);
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
  //const updatedUserID = req.user;

  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageURL;
    //product.userId = updatedUserID;
    return product.save()
  })
  .then(result => {
    console.log('Product Updated !');
      res.status(200);
      res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    //  .populate('userId') //Fetch the entire user object data using the userId ref
    .then(products => {
      console.log(products);
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
  Product.findByIdAndRemove(prodId)
  .then(() => {
    console.log('Product deleted successfully!');
    res.status(200);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};
