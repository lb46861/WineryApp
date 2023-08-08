const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const producerController = require('../controllers/producer');
const { authenticateUser, restrictAdminRoutes } = require('../middleware/authentication');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(
    callbackErrorHandler(producerController.getAll)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(producerController.getOne)
  );

// administrator routes
router.use(callbackErrorHandler(restrictAdminRoutes));
router
  .route('/')
  .post(callbackErrorHandler(producerController.create));
router
  .route('/:id')
  .put(
    callbackErrorHandler(producerController.update)
  )
  .delete(
    callbackErrorHandler(producerController.delete)
  );

module.exports = router;
