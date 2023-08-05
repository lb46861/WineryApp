const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.URI;

async function reachClientDb () {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'winery'
  });

  const app = require('./app');

  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
}

console.log(`Application started, running on port http://localhost:${process.env.PORT} ...`);
reachClientDb();
