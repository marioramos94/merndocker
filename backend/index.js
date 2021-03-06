const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send("💥 BOOM 💥: " + err);
    } else {
      res.send("Me conecté a la 😎");
      db.close();
    }
  });
});

// endpoint para redirigir al front
app.get("/home", (req, res) => {
  res.redirect("http://18.236.147.124");
});

// endpoint para leer todos los productos
app.get("/products", (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("store");
    dbo
      .collection("products")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
        db.close();
      });
  });
});

//endpoint para crear los productos

app.post("/product", (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    console.log(mongoUrl);
    if (err);
    var dbo = db.db("store");
    var myobj = req.body;
    dbo.collection("products").insertOne(myobj, function(err, obj) {
      if (err) throw err;

      console.log("Product Added ");

      db.close();
    });
    res.send("Product Added");
  });
});

//endpoint para eliminar los productos
app.delete("/product", (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("store");

    var myquery = { id: req.body.id };
    dbo.collection("products").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
    res.send("Product deleted");
  });
});

app.put("/product", (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("store");

    var newvalues = { $set: req.body };
    dbo
      .collection("products")
      .updateOne(req.body.id, newvalues, function(err, res) {
        if (err) throw err;

        console.log("1 Product updated");
        db.close();
      });
    res.send("Product updated");
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
