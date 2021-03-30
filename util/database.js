const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var db;
const uri = "mongodb+srv://francois-01:5YlpjoM7D2nxh40c@cluster0.qcddy.mongodb.net/stockUpDB?retryWrites=true&w=majority";
const mongoConnect = (cb) => {
  MongoClient.connect(uri)
  .then(async client => {
    console.log('Connected!');
    db = await client.db();
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
const closeDBConnection = () =>{
  try{
    MongoClient.close();    
  }catch(err){
      throw err;
  }    
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
exports.closeDBConnection = closeDBConnection;

