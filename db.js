const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://localhost:27017");
  client.connect(() => {
    const database = client.db("your_db_name");
    db.inventory = database.collection("inventories");
    db.order = database.collection("order");
    db.user = database.collection("user");
  });
};

module.exports = { connectToDb, db };
