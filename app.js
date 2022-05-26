const express = require('express');
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose');
var flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const app = express();
//passport config
require('./config/passport')(passport);

//DB config

const db = require('./config/key').MongoURI;

//Connection to MongoDB

mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('..MongoDB Connected'))
.catch(err=> console.log(err))

//EJS'
app.use(expressLayouts);
app.set('view engine', 'ejs');


//Bodyparser
app.use(express.urlencoded({extended: false}));



// Express session

app.use(session({
    secret: 'terces',
    resave: true,
    saveUninitialized: true,

    
  }));
// passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
// Connect flash
   

  app.use(flash());

  // Global vars
  app.use((req, res, next)=>{
      res.locals.success_msg = req.flash('success_msg')
      res.locals.error_msg = req.flash('error_msg')
      res.locals.error = req.flash('error')
      next(); 
  });

     

//Routes
app.use('/', require('./route/index'));

app.use('/users', require('./route/users'));
const PORT = process.env.PORT||8002;

app.listen(PORT, console.log(`server started on port ${PORT}`));