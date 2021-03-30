const mongodb = require('mongodb');
const getDb = require('../util/database').getDB;
const Validator = require("validatorjs");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null; //If id exists -> create ObjectId obj, else null
    this.userId = userId;
  }

  isValid(){
		const rules = {
			title: 	     'required|string',
			price:       'required|string',
			description: 'required|string',
			imageUrl:    'required|string',
			userId:      'required|string',
		}
		const validation = new Validator(this, rules);
		return validation.passes();		
	};
  
  save() {
    const db = getDb();
    //console.log(db); 
    let dbOperation; //Either updateOne or insertOne
    if (this._id) {
      // Update the product if this product_id already exists
      dbOperation = db.collection('Catalogue').updateOne({ _id: this._id }, { $set: this });
    } else {
      // Else create new product with this product_id
      dbOperation = db.collection('Catalogue').insertOne(this);
    }
    return dbOperation
      .then(result => {
        console.log(result.ops);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('Catalogue')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('Catalogue')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId){
    const db = getDb();
    return db.collection('Catalogue').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result => {
      console.log('Product Deleted!');
    })
    .catch(err => {
      console.log(err);
    })

  }


}

module.exports = Product;
