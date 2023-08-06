const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const producerController = require('../controllers/producer');

router
  .route('/')
  .post(callbackErrorHandler(producerController.createProducer));

router
  .route('/')
  .get(
    callbackErrorHandler(producerController.getAllProducers)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(producerController.getProducer)
  )
  .put(
    callbackErrorHandler(producerController.updateProducer)
  )
  .delete(callbackErrorHandler(producerController.deleteProducer));

module.exports = router;
