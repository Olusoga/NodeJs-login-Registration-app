const express = require('express');
const flash = require('connect-flash')
const router = express.Router();
const bcrypt = require('bcryptjs')

const passport = require('passport');
const User = require('../Model/User');
const RegisterController = (req, res)=>{
    
    const {name, email, password, password2} = req.body;
    let errors= [];

    //checked required field
    if(!name || !email || !password || !password2){
        errors.push({msg: 'fill in all field'});
    }

    //checked if password doesnot matching
    if(password !== password2){
        errors.push({msg:'password do not match'});

    }

    //checked password viability

    if(password.length<6){
        errors.push({msg:'password should be at least six chatacters'});
    
        
        
    }
    if(errors.length > 0){
     return  res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
        
    }else{
    //validation passed
    User.findOne({email:email})
    
    .then(user => {
        if(user) {
            //user exists
            errors.push({msg: "Email already exists"});
             return res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            })            
        } else {
            const newUser = new User({
                name, 
                email,
                password,
                password2
            });
          

    //Hash password
           bcrypt.genSalt(10, (err, salt)=>{
               bcrypt.hash(newUser.password, salt, (err, hash)=>{
                   if(err) throw err
                   //set password to Hashed
                   newUser.password = hash;
                   //save newUser
                   newUser.save()
                   .then(user => {                     
                       req.flash('success_msg', 'You are now registered and can login');
                       
                       res.redirect('/users/login');
                       
                   })
                   .catch(err=> console.log(err))
               });
           });
        }
    });
    }
}
module.exports = RegisterController;