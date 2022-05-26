const express = require('express');
const flash = require('connect-flash')
const router = express.Router();
const bcrypt = require('bcryptjs')

const passport = require('passport');
const User = require('../Model/User');
const LoginController = (req, res) => res.render('login');

module.exports = LoginController;