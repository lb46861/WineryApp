const express = require('express');
const router = express.Router();
const { callbackErrorHandler } = require('../middleware/error-handler');

const wineController = require('../controllers/wine');
const { authenticateUser, restrictAdminRoutes } = require('../middleware/authentication');

router.use(callbackErrorHandler(authenticateUser));
router
  .route('/')
  .get(
    callbackErrorHandler(wineController.getAll)
  );

router
  .route('/:id')
  .get(
    callbackErrorHandler(wineController.getOne)
  );

// administrator routes
router.use(callbackErrorHandler(restrictAdminRoutes));
router
  .route('/')
  .post(callbackErrorHandler(wineController.create));

router
  .route('/:id')
  .put(
    callbackErrorHandler(wineController.update)
  )
  .delete(callbackErrorHandler(wineController.delete));

module.exports = router;
