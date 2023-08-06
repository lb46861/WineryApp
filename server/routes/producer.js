const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const producerController = require('../controllers/producer');

router
  .route('/')
  .post(callbackErrorHandler(producerController.create));

router
  .route('/')
  .get(
    callbackErrorHandler(producerController.getAll)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(producerController.getOne)
  )
  .put(
    callbackErrorHandler(producerController.update)
  )
  .delete(callbackErrorHandler(producerController.delete));

module.exports = router;
