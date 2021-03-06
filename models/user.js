const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 


class User {
  constructor(username, email, cart, id){
    this.username = username;
    this.email = email;
    this.cart = cart; //items: []
    this._id = id;
  }


  save() {
    const db = getDb();
    return db.collection('Users').insertOne(this);
    
  }

  addCart(product){
    const cartProductIndex = this.cart.items.findIndex(cart_prod => {
      return cart_prod.productId.toString() === product._id.toString();  
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    
    }else{
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity})
    }
    
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db.collection('Users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
  }

  static findById(userId){
    const db = getDb();
    return db.collection('Users').findOne({_id: new mongodb.ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
    });

  }
}

module.exports = User;
