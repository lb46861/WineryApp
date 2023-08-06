const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const wineController = require('../controllers/wine');

router
  .route('/')
  .post(callbackErrorHandler(wineController.create));

router
  .route('/')
  .get(
    callbackErrorHandler(wineController.getAll)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(wineController.getOne)
  )
  .put(
    callbackErrorHandler(wineController.update)
  )
  .delete(callbackErrorHandler(wineController.delete));

module.exports = router;
