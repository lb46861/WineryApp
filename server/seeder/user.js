const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI = process.env.URI;
const User = require('../models/user');
const { roles } = require('../utils/constants');

async function seedAdministrator () {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'winery'
    });
    await User.create({
      _id: process.env.ADMIN_ID,
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: roles.administrator
    });
    console.log('Successfully created administrator!');
  } catch (err) {
    console.log(err.message);
  }
  mongoose.disconnect();
}

seedAdministrator();
