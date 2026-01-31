const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router();

router
    .route('/api/v1/start-auth')
    .post(authController.startAuth)

router
    .route('/api/v1/verify-otp')
    .post(authController.verifyOtp)

module.exports = router;
