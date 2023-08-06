const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const userController = require('../controllers/user');

router
  .route('/')
  .get(
    callbackErrorHandler(userController.getAllUsers)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(userController.getUser)
  )
  .put(
    callbackErrorHandler(userController.updateUser)
  )
  .delete(callbackErrorHandler(userController.deleteUser));

router
  .route('/register')
  .post(callbackErrorHandler(userController.register));

router
  .route('/login')
  .post(callbackErrorHandler(userController.login));

module.exports = router;
