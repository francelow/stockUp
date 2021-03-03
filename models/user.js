const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 


class User {
  constructor(username, email, id){
    this.username = username;
    this.email = email;
  }


  save() {
    const db = getDb();
    return db.collection('Users').insertOne(this);
    
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
