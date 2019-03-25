const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient

// Connection URL
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/';

app.get('/test', (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) {
      res.status(500).send('💥 BOOM 💥: ' + err);
    } else {
      res.send('Me conecté a la DB! 😎');
      db.close();
    }
  });
});

// endpoint para redirigir al front
app.get('/home', (req, res) => {
  res.redirect('/')
  
});


// endpoint para leer todos los productos 
app.get('/products', (req, res) => {

  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("store");
    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      console.log(result);
      db.close();
    });
  });  

});

//endpoint para crear los productos

app.post('/product', (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true },(err, db)=> {
    if (err) throw err;
    var dbo = db.db("store");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("products").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("Product Added ");
      db.close();
    });
  });
});


//endpoint para eliminar los productos 
app.delete('/product', (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("store");
    var myquery = { id: req.body.data };
    dbo.collection("products").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});




app.listen(port, () => console.log(`Server listening on port ${port}!`))
