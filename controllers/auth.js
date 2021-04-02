
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1c19b2ba5628f4",
      pass: "a1cb717ca13e25"
    }
});

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
        .then(result => {
            //after signing up, redirect new user to login page
            res.redirect('/login');
            transporter.sendMail({
                to: email,
                from:'stockupenterprise@gmail.com',
                subject:'Sign up successful!',
                html: '<h1>You have successfuly sign up!</h1>'
            });
            
        })
        .catch(err => {
            console.log(err);
        });
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

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    }else{
        message = null;
    }

    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err){
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
        .then(user => {
            if (!user){
                req.flash('error', 'Specified e-mail address not found!');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
        .then(result => {
            res.redirect('/');
            transporter.sendMail({
                to: req.body.email,
                from:'stockupenterprise@gmail.com',
                subject:'Password reset successful!',
                html: `
                <h1>Password reset request</h1>
                <p>You have requested a password reset.</p>
                <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`
            });
        })
        .catch(err =>{
            console.log(err);
        });
    });
}
exports.getNewPassword = (req, res, next) => {

    const token = req.params.token; //Retrieves the reset password token
    
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})//token expiration date must be "greater than" current date
    .then(user => {
        let message = req.flash('error');
        if (message.length > 0){
            message = message[0];
        }else{
            message = null;
        }
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'New Password',
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token
        });
    })
    .catch(err => {
        console.log(err);
    })

    
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: {$gt: Date.now()},
        _id: userId
    })
    .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword,12);
    })
    .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = null;
        resetUser.resetTokenExpiration = undefined;
        resetUser.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    })
}





