import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { List } from "./models/list.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
//Don't delete env
const env = dotenv.config();
//Vars storing MongoDB api key and port values
const dbURI = process.env.MONGO_API_KEY;
const port = process.env.PORT || 3000;

//Connecting to the MongoDB Database, will start server once DB is connected
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log("Connected to Database");
    console.log(`Server opened at http://localhost:${port}`);
  })
  .catch((err) => {
    console.log("Not able to connect to Database");
  });

//Defining the root dir pathname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Used for parsing the JSON data on requests
const jsonParser = bodyParser.json();

//Serving static files

app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images"));

//Getting DB list items and returning to front end
app.get("/get-list", (req, res) => {
  List.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Serving Index page when page is loaded
app.get("/", (req, res) => {
  app.use("/public/js/auth.js", express.static(__dirname + "/public/js/auth.js"));
  res.sendFile(__dirname + "/public/html/main.html");
  //res.sendFile(__dirname + "/public/index.html");
});

//Getting post data passed from front-end and uplaoding to MongoDB
app.post("/newItem", jsonParser, (req, res) => {
  const listObj = new List({
    id: uuidv4(),
    itemNo: req.body.itemNo,
    message: req.body.message,
    checked: req.body.checked,
  });

  listObj
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
//Delete Item from
app.post("/delItem", jsonParser, (req, res) => {
  const item = { id: req.body.uid };

  List.deleteOne(item)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/updateItem", jsonParser, (req, res) => {
  console.log(req.body);
  const uid = req.body.uid.toString();

  const key = { id: uid };
  const newVal = { $set: { checked: req.body.checked } };

  List.updateOne(key, newVal)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
