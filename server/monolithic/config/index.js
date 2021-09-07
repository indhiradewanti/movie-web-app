const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)
let database = null

async function run() {
  try {
    await client.connect();
    console.log('Mongodb connected!');
    database = client.db('munichfox');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
} 

function getDatabase() {
    return database
}

module.exports = {
    run,
    getDatabase
}