const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
const PORT = parseInt(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const URI = process.env.URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const db = client.db('vinarija');
const proizvod = db.collection('proizvod'); 


proizvod.find({}).toArray((err, documents) => {
    if (err) {
      console.error('Error reading data from proizvod:', err);
    } else {
      console.log('Data from proizvod:', documents);
    }
  });

client.close()
