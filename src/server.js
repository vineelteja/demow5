const bodyparser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect("mongodb://mongo_camp:27017/demo5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Books = mongoose.model("books", {
  title: { type: String },
  author: { type: String },
});

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("listening on port 5000");
});

app.get("/", (req, res) => {
  Books.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db document length : ", docs.length);
      res.send(docs);
    }
  });
});

app.post("/updateitem", function (req, res) {
  Books.updateOne(
    { _id: req.body._id },
    { title: req.body.title, author: req.body.author },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
        res.send(docs);
      }
    }
  );
});

app.post("/additem", (req, res) => {
  Books.insertMany([{ title: req.body.title, author: req.body.author }])
    .then(function () {
      console.log("Data inserted"); // Success
      res.send({ status: "Data Inserted" });
    })
    .catch(function (error) {
      res.send({ status: error });
      console.log(error); // Failure
    });
});

app.delete("/deleteitem", (req, res) => {
  Books.deleteOne({ _id: req.body._id })
    .then(function () {
      console.log("Data deleted"); // Success
      res.send({ status: "Data deleted" });
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.send({ status: error });
    });
});
