const express = require('express');

const router = express.Router();

// controller handler
const LoginController = require('../controller/LoginController');
const RegisterController = require('../controller/RegisterController');
const AuthController = require('../controller/AuthController');
const LogoutController = require('../controller/LogoutController');
const PagerenderController = require('../controller/PagerenderController');

//Login pages
router.get('/Login', LoginController)

//Register page
router.get('/Register', PagerenderController);

//Registeration handler
router.post('/Register', RegisterController);

//Authenticate handle
router.post('/login', AuthController);

// Logout handle
router.get('/logout', LogoutController);

module.exports = router;
