const express = require('express');
const flash = require('connect-flash')
const router = express.Router();
const bcrypt = require('bcryptjs')

const passport = require('passport');
const User = require('../Model/User');
const LogoutController = (req, res, next)=> {
    req.logout();
    req.flash('success_msg', 'You are logout');
    res.redirect('/users/login');
};

module.exports = LogoutController;