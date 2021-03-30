var assert = require('assert');
const mongodb = require('mongodb');
const request = require('request');
const User = require('../models/user');

var myurl = 'http://localhost:3000/';
describe('Testing the User model', function(){
    /*
    it('POST - Add item to cart', function(done){
        let user = new User('Tom', 'tom@test.com', {items:[]}, '603eeae6de09a9e8e15b35cd')
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'cart',
            body: [JSON.stringify({user})],
            body:[JSON.stringify({productId:'603f0972fe19b255c03f87ec'})]
        }, function(error, response, body){
                if (error) console.dir(error);
                //console.log(body);
                assert.strictEqual(body, "Found. Redirecting to /cart");
                done();
        });
      
    }); */

    /*
    it('POST - Delete item to cart', function(done){
        //Creating user object with 2 "Netflix-N-Chill Ben & Jerry Special" items in the cart

        let user = new User('Tom', 'tom@test.com', {items:[{productId: new mongodb.ObjectId("603f09c9fe19b255c03f87ed"), quantity: 2}]}, '603eeae6de09a9e8e15b35cd')
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'cart-delete-item',
            body: [JSON.stringify({user})],
            body:[JSON.stringify({productId:'603f09c9fe19b255c03f87ed'})]
        }, function(error, response, body){
                if (error) console.dir(error);
                console.log(body);
                assert.strictEqual(body, "Found. Redirecting to /cart");
                done();
        });
      
    }); 
    */
    /*
    it('GET - Get item(s) from cart', function(done){
        
        request.get({
            headers: {'content-type': 'application/json'},
            url: myurl+'cart',
        }, function(error, response, body){
                if (error) console.dir(error);
                //console.log(body);
                //console.log(response);
                var condition = body.includes("603f0a0cfe19b255c03f87ee") && body.includes("603f0d0ffe19b255c03f87ef"); //Fries & Nuggets Combo and Cheeseburger
                assert.strictEqual(condition, true); 
                done();
        });
      
    }); */
    /*
    it('POST - Add order from cart', function(done){
        
        request.post({
            headers: {'content-type': 'application/json'},
            url: myurl+'create-order',
        }, function(error, response, body){
                if (error) console.dir(error);
                console.log(body);
                //console.log(response);
                //assert.strictEqual(body, 'Found. Redirecting to /orders'); 
                done();
        });
      
    }); */
    





});