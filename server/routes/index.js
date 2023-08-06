const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const producerRouter = require('./producer');
const wineRouter = require('./wine');

router.use('/user', userRouter);
router.use('/producer', producerRouter);
router.use('/wine', wineRouter);

module.exports = router;
