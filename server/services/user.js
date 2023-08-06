const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');
const User = require('../models/user');
const collectionName = User.collection.collectionName;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByEmail = async (email) => {
  const model = await User.findOne({ email });

  if (!model) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(collectionName));

  return model;
};

const comparePassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    process.env.TOKEN);
  return token;
};

exports.login = async (req) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!await comparePassword(password, user.password)) {
    throw errors.UNAUTHORIZED(responseMessages.INVALID_CREDENTIALS);
  }

  const token = createToken(user);

  return [token, user.role];
};
