const express = require('express');
const flash = require('connect-flash')
const router = express.Router();
const bcrypt = require('bcryptjs')

const passport = require('passport');
const User = require('../Model/User');
const AuthController=(req, res, next) =>{
    
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
};
module.exports = AuthController;