
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

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
    if(product.userId.toString() !== req.user._id.toString()){
      return res.redirect('/');
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageURL;
    //product.userId = updatedUserID;
    return product.save()
    .then(result => {
      console.log('Product Updated !');
        res.status(200);
        res.redirect('/admin/products');
    })
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
  Product.deleteOne({_id: prodId, userId: req.user_id})
  .then(() => {
    console.log('Product deleted successfully!');
    res.status(200);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};


exports.getDashboard = (req, res, next) => {
  var totalOrders = 0;
  var totalIncome = 0;
  var customerList = [];
  var totalCustomers = 0;
  let price = 0;
  let customer = null;
  
  Order.find()
  .then(orders => {
    orders.forEach(o => {
      totalOrders += 1;
      console.log(o);
      o.products.forEach(p =>{
        price = p.quantity * p.product.price;
        totalIncome += price;
        customer = o.user.email;
        if (customerList.length == 0){
          customerList.push(customer);
          totalCustomers += 1;
        }else if (customerList.indexOf(customer) === -1){
          customerList.push(customer);
          totalCustomers += 1;
        }
        /*
        console.log('print p!');
        console.log(p);
        console.log('print p.quantity!');
        console.log(p.quantity);
        console.log('print p.product.price!');
        console.log(p.product.price);
        */
      });
    });
  })
  .then(result => {
    res.render('admin/dashboard', {
      path: '/dashboard',
      pageTitle: 'Dashboard',
      totalOrders: totalOrders,
      totalIncome: totalIncome,
      totalCustomers: totalCustomers
    })
  })
  
  .catch(err => console.log(err));
  
};
