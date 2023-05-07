const express = require("express");
const { connectToDb, db } = require("./db");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();

const users = [
  { id: 1, username: "Ben", password: "123456" },
  { id: 2, username: "Harley", password: "123456" },
];

app.use(express.json());

app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();

  //cau 2
  app.get("/api/products", async (req, res) => {
    try {
      const products = await db.inventory.find().toArray();
      res.status(200).json({ status: "success", data: products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  //cau 3
  app.get("/api/products/low_instock", async (req, res) => {
    try {
      const products = await db.inventory
        .find({ instock: { $lt: 100 } })
        .toArray();
      res.send(products);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });

  //cau 4
  const jwtSecret = "mysecretkey";
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      const token = jwt.sign({ id: user.id }, jwtSecret);
      res.json({ token });
    } else {
      res.status(401).send("Invalid login credentials");
    }
  });

  //cau 6
  app.post("/api/orders", async (req, res) => {
    const {Name, PhoneNumber, item, quantity} = req.body
    try {
      const orders = await db.order.insertOne({Name, PhoneNumber, item, quantity});
      res.json(result.ops[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });
});
