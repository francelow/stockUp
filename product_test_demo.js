var assert = require('assert');
const Product = require('../models/product');
const mongodb = require('mongodb');

const dbConnect = require('../util/database').mongoConnect;
const dbClose = require('../util/database').closeDBConnection;
const getDatabase = require('../util/database').getDB;

var db;
// This method runs once and connects to the mongoDB
before(async function() {
	try {
		db = await dbConnect();
	}catch(err){
		throw err;
	}
});
// this method will close your connection to MongoDB after the tests
after(async function() {
    try{
        dbClose();
    }catch(err){
        throw err;
    }
	
});

describe('Testing the Product API', function(){
    describe('Testing the Product Model', function(){
        it('Fail 1 - Test creation of a new valid Product with parameters not matching', function(){
            
            let newProduct = new Product(22, "TGIF party", "Hassle-free party package to enjoy your Friday night","https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
            assert.strictEqual(newProduct.isValid(),false);
        });
        it('Fail 2 - Test an invalid Product title', async function(){
         
            let newProduct = new Product(0012, 22, "Hassle-free party package to enjoy your Friday night","https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
            assert.strictEqual(newProduct.isValid(),false);
        
        });
        it('Fail 3 - Test an invalid Product price',  function(){
            
            let newProduct = new Product( "TGIF party", "abc", "Hassle-free party package to enjoy your Friday night","https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
            assert.strictEqual(newProduct.isValid(), false);
            
        });
        it('Fail 4 - Test an invalid Product description', function(){
           
            let newProduct = new Product( "TGIF party", 22, 2213,"https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
            assert.strictEqual(newProduct.isValid(), false);
           
        });
        
        it('Success 1 - Test the insertion of a new valid product (Product.save) - Success Msg test', function(){

            //Replace the first param with the ID you want to save
        
            let newProduct = new Product( "TGIF party", 22.00, "Hassle-free party package to enjoy your Friday night","https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
            
            db =  dbConnect();
            newProduct.save()
            .then(result => {
                console.log('Product is saved successfully!');
            })
            .catch((err) => {
                console.dir(err);
            });
            dbClose();
     
        });


        it('Success 2 - Test the update of a valid product (Product.save) - Success Msg test', function(){
            let newProduct = Product.findById('6046aac7d301e12948845bd0');
            newProduct.title = 'Quaker Oatmeal cups';
            newProduct.price = 27.00;
            
            newProduct.save()
            .then(function(result){
                console.log("Product is updated successfully!")
            })
            .catch((err) => {
                console.dir(err);
            });
       
        });
        it('Success 3 - Test the deletetion of a valid product (Product.deleteById) - Success Msg test', function(){
            
            Product.delete('6046ada3923e965550fb282e') 
            .then(function(result){
                console.log("Product successfully deleted!");
            })
            .catch((err) =>{
                console.dir(err);
            });
            
        });
        it('Success 4 - Test the retrieval of a product by id (Product.findById) - Success Msg test', function(){
            //Replace the second param with the ID you want to find
            Product.findById('603f0a0cfe19b255c03f87ee')
            .then(function(result){
                console.log(result);
            })
            .catch((err) =>{
                console.dir(err);
            });
            
        });
        it('Success 5 - Test the retrieval of all products (Product.fetchAll) - Success Msg test', function(){
            findById
            Product.fetchAll()
            .then(function(result){
                console.log(result);
                console.log("Listing all products successfully!");
            })
            .catch((err) =>{
                console.dir(err);
            });
        });
    });
    
});

