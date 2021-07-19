import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import { List } from "./models/list.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dbURI = "mongodb+srv://admin:Missydead12!@cluster0.yqqde.mongodb.net/ToDoList?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not able to connect to Database");
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images"));

app.get("/api", (req, res) => {
  List.find()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/add-list", (req, res) => {
  const list = new List({
    itemNo: req.body.itemNo,
    message: req.body.message,
    checked: req.body.checked,
  });

  list
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
