const Product = require('../models/product');
const Order = require('../models/order');
const stripe = require('stripe')('sk_test_51Ibt45GwboVvYC3K6V2qte18KEi7kyR3FJx454KYEh8i2fnBwlrknJBb1ErKus7Vns9kZMNzbHqreknaPrNoIa4d00UY0iVrbX');

const express = require('express');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  let products;
  let total = 0;
  
  req.user
  .populate('cart.items.productId')
  .execPopulate() //return a promise here
  .then(user => {
    console.log(user.cart.items);
    products = user.cart.items;
    total = 0;
    products.forEach(p => {
      total += p.quantity * p.productId.price;
    });
    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map(p => {
        //Stripe required format
        return {
          name: p.productId.title,
          description: p.productId.description,
          amount: p.productId.price * 100,
          currency: 'usd',
          quantity: p.quantity
        };
      }),
      //Stripe rediirect url (depending on sucess or failure of payment)
      success_url: req.protocol + '://' + req.get('host') + '/checkout/success', // => http://localhost:3000/ 
      cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
    });

  })
  .then(session => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout',
      products: products,
      totalSum: total,
      sessionId: session.id
    });
    
  })
  .catch(err => {
    console.log(err)
  });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
     
    })
    .catch(err => console.log(err));
    

};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
;
  //console.log(req);
  req.user
  .populate('cart.items.productId')
  .execPopulate() //return a promise here
  .then(user => {
    console.log(user.cart.items);
    const products = user.cart.items;
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })
  .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  //console.log(req.body);
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  }); 
  
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  //console.log(req.body);
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.getCheckoutSuccess = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  .execPopulate() //return a promise here
  .then(user => {
    console.log(user.cart.items);
    const products = user.cart.items.map(i => {
      return {quantity: i.quantity, product: {...i.productId._doc}}; //i.productId._doc returns each product object with details
    });  
    const order = new Order({
      user: {
        email: req.user.email,
        userId: req.user
      },
      products: products
    });
    return order.save();
  })
  .then(result => {
    return req.user.clearCart();
  })
  .then(() => {
    console.log('Order Sent!');
    res.status(200);
    res.redirect('/orders');
  })
  .catch(err => {
    console.log(err)
    
  });
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  .execPopulate() //return a promise here
  .then(user => {
    console.log(user.cart.items);
    const products = user.cart.items.map(i => {
      return {quantity: i.quantity, product: {...i.productId._doc}}; //i.productId._doc returns each product object with details
    });  
    const order = new Order({
      user: {
        email: req.user.email,
        userId: req.user
      },
      products: products
    });
    return order.save();
  })
  .then(result => {
    return req.user.clearCart();
  })
  .then(() => {
    console.log('Order Sent!');
    res.status(200);
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
};

