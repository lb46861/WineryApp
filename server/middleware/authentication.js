const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');
const jwt = require('jsonwebtoken');
const { roles } = require('../utils/constants');

exports.authenticateUser = async (req, _res, next) => {
  if (!req.headers.authorization) throw errors.UNAUTHORIZED(responseMessages.MISSING_AUTHORIZATION);
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  if (!token) throw errors.UNAUTHORIZED(responseMessages.INVALID_TOKEN);
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  req.user = decodedToken;
  next();
};

exports.restrictAdminRoutes = (req, _res, next) => {
  const userRole = req.user.role;
  if (userRole !== roles.administrator) throw errors.UNAUTHORIZED(responseMessages.FORBIDDEN);
  return next();
};
