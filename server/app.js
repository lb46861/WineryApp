const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');
const { errorMiddleware } = require('./middleware/error-handler');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);
app.use(errorMiddleware);

// page not found if invalid route
app.all('*', (_req, res) => {
  return res.sendStatus(404);
});

module.exports = app;
