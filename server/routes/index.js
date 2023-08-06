const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const producerRouter = require('./producer');

router.use('/user', userRouter);
router.use('/producer', producerRouter);

module.exports = router;
