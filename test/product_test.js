var assert = require('assert');
const request = require('request');
const Product = require('../models/product');

var myurl = 'http://localhost:3000/admin';
describe('Testing the Product model', function(){
    /*
    it('POST - Add Product', function(done){
        let newProduct = new Product( "TGIF party", 22.00, "Hassle-free party package to enjoy your Friday night","https://i.ibb.co/pW5bG9J/TGIF.jpg" , null, '603eeae6de09a9e8e15b35cd');
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'/add-product',
            body: JSON.stringify(newProduct)
        }, function(error, response, body){
                if (error) console.dir(error);
                //console.log(body);
                assert.strictEqual(body, "Found. Redirecting to /admin/products");
                done();
        });
      
    }); */
    /*
    it('POST - Edit Product', function(done){
        //original product = _id:6046a484e1bd992948a58a13, title:"Doritos", price: "4.00", description: "Nacho Cheese Doritos", imageUrl:"https://images-na.ssl-images-amazon.com/images/I/41fdalccKrL._AC_SY780_.jpg",userId:"603eeae6de09a9e8e15b35cd"
        let editProduct = new Product( "Flammin-Hot Doritos", "2.50", "Unmatched spicy nacho chips!","https://www.doritos.com/sites/doritos.com/files/2019-01/Doritos%20FHN%20XXL.png" , '6046a484e1bd992948a58a13', '603eeae6de09a9e8e15b35cd');
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'/edit-product',
            body: JSON.stringify(editProduct)
        }, function(error, response, body){
                if (error) console.dir(error);
                //console.log(body);
                assert.strictEqual(body, "Found. Redirecting to /admin/products");
                done();
        });
      
    }); */
    /*
    it('POST - Delete Product by ID', function(done){
        //original product = _id:"60626c4a033c414f481c60ec", title:"Tacos", price:"15", description:"5 Authentic Mexican Tacos", imageUrl:"https://s3-eu-west-1.amazonaws.com/uploads.playbaamboozle.com/uploads/images/135571/1606724771_192192", userId:"603eeae6de09a9e8e15b35cd"
        let deleteProduct = new Product( "", "", "","" , '60626c4a033c414f481c60ec', ""); //Only fill in the 5th param with MongoDB assigned ID
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'/delete-product',
            body: JSON.stringify(deleteProduct)
        }, function(error, response, body){
                if (error) console.dir(error);
                //console.log(body);
                assert.strictEqual(body, "Found. Redirecting to /admin/products");
                done();
        });
      
    }); */
    
    /*
    it('GET - Get Product by ID', function(done){
        //Product: Chobani Yogurt Pouches
        let productID = "6046ada3923e965550fb282e"; //MongoDB assigned ID
        request.get({
            headers: {'content-type': 'application/json'},
            url: 'http://localhost:3000/products/'+productID,
        }, function(error, response, body){

                if (error) console.dir(error);
                assert.strictEqual(body.includes("Chobani Yogurt Pouches"), true);
                done();
        });
      
    }); */
    /*
    it('GET - Get All Products', function(done){
        request.get({
            headers: {'content-type': 'application/json'},
            url: 'http://localhost:3000/products',
        }, function(error, response, body){
                console.log(body);
                //Coca-Cola Party Pack, Netflix-N-Chill Ben & Jerry Special, Fries & Nuggets Combo, Cheeseburger, Oatmeal cups  are the main products, the others are mutable.
                var condition = body.includes("603f0972fe19b255c03f87ec") && body.includes("603f09c9fe19b255c03f87ed") && body.includes("603f0a0cfe19b255c03f87ee") && body.includes("603f0d0ffe19b255c03f87ef") && body.includes("6046aac7d301e12948845bd0");
                if (error) console.dir(error);
                assert.strictEqual(condition, true);
                done();
        });
      
    });*/

    
    

    
});

