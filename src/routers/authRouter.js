const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router();

router
    .route('/api/v1/signup')
    .post(authController.signup)

router
    .route('/api/v1/login')
    .post(authController.login)

module.exports = router;
