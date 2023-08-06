const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const userController = require('../controllers/user');

router
  .route('/')
  .get(
    callbackErrorHandler(userController.getAll)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(userController.getOne)
  )
  .put(
    callbackErrorHandler(userController.update)
  )
  .delete(callbackErrorHandler(userController.delete));

router
  .route('/register')
  .post(callbackErrorHandler(userController.register));

router
  .route('/login')
  .post(callbackErrorHandler(userController.login));

module.exports = router;
