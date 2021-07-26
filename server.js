import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { List } from "./models/list.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
//Don't delete env
const env = dotenv.config();

const dbURI = process.env.MONGO_API_KEY;
const port = process.env.PORT || 3000;

//Using BodyParse to parse the req.body
const jsonParser = bodyParser.json();

//Not using this yet, may delete later
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

//Serving static files
app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images"));

//Getting DB list items and returning to front end
app.get("/get-list", (req, res) => {
  List.find()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Serving Index page when page is loaded
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Getting post data passed from front-end and uplaoding to MongoDB
app.post("/add-list", jsonParser, (req, res) => {
  const list = new List({
    id: uuidv4(),
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
//Delete Item from
app.post("/del-list", jsonParser, (req, res) => {
  List.deleteOne({ id: req.body.uid })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update-list", jsonParser, (req, res) => {
  console.log(req.body);
  const uid = req.body.uid.toString();

  List.updateOne({ id: uid }, { $set: { checked: req.body.checked } })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
