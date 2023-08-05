const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const generalController = require('../controllers/user');

router
  .route('/register')
  .post(callbackErrorHandler(generalController.register));

module.exports = router;
