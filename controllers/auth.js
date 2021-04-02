const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    //console.log(req.get('cookie').split(';')[1].trim().split('=')[1]);
    //const isLoggedIn = req.get('cookie').split(';')[1].trim().split('=')[1];
    //console.log(req.session);
    //console.log(req.session.isLoggedIn);
    //console.log(req.flash('error'));
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message
    });
  };

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'isLoggedIn=true; HttpOnly') //'Set-Cookie' is a reserved field name, 'HttpOnly' prevents client-side from reading cookie values
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if (!user){
            req.flash('error', 'Invalid email or password!');
            return res.redirect('/login')
        }
        //compare user hashed password to actual password
        bcrypt.compare(password, user.password)
        //result is a boolean - True if match, false otherwise
        .then(result => {
            if (result){
                //Store session if login is successful
                req.session.isLoggedIn = true;
                req.session.user = user;

                // return a promise here to prevent executing res.redirect('/login');
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            req.flash('error', 'Invalid email or password!');
            res.redirect('/login');
        })
        .catch(err =>{
            console.log(err);
            res.redirect('/login');
        });
        
    })
    .catch(err => console.log(err));
      
};
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
    .then(userData => {
        //if email already exists
        if (userData){
            req.flash('error', 'E-mail exists already!');
            return res.redirect('/signup');
        }
        //Prevent password from appearing on mongodb
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {items: []}
            });
            return user.save();
        })
        .then(() => {
            //after signing up, redirect new user to login page
            res.redirect('/login');
        })
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    });
        
};





