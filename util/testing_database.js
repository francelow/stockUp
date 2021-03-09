const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;
const uri = "mongodb+srv://francois-01:5YlpjoM7D2nxh40c@cluster0.qcddy.mongodb.net/testingDB?retryWrites=true&w=majority";
const mongoConnect = (cb) => {
  MongoClient.connect(uri)
  .then(client => {
    console.log('Connected!');
    db = client.db();
    cb();

  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDB = () => {
  if (db){
    return db;
  }
  throw('No database found!');
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;