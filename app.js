const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
 User.findById('6065db6539d2515d74b2a0d9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://francois-01:5YlpjoM7D2nxh40c@cluster0.qcddy.mongodb.net/stockUpDB?retryWrites=true', { useUnifiedTopology: true }
  )
  .then(result => {
    User.findOne().then(user => {
      //If no user object is found in db, create a new default user object
      if(!user){
        const user = new User({
          name: 'Tom',
          email: 'tom@email.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    
    console.log("Connected!");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });