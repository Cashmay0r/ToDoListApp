import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { List } from "./models/list.js";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

const app = express();
//Don't delete env
const env = dotenv.config();
//Vars storing MongoDB api key and port values
const dbURI = process.env.MONGO_API_KEY;
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

var firebaseConfig = {
  apiKey: "AIzaSyBZZwG13vpoOxxzhwdNcg8FRFa5OkJwAYM",
  authDomain: "todolist-9c809.firebaseapp.com",
  projectId: "todolist-9c809",
  storageBucket: "todolist-9c809.appspot.com",
  messagingSenderId: "292110508993",
  appId: "1:292110508993:web:7769002ab9782206af8540",
  measurementId: "G-890NPESGRB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
app.use(express.static(__dirname + "/public"));

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

//Serving login page when page is loaded
app.get("/", (req, res) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      res.render("main");
      // var uid = user.uid;

      // ...
    } else {
      // User is signed out
      res.render("login");
      // ;
    }
  });
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

app.post("/login", jsonParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.email);
      res.render("main");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      res.render("login");
    });
});
app.post("/register", jsonParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      res.render("main");

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      res.render("login");
      // ..
    });
});
app.post("/logout", jsonParser, (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});
app.get("/userDetails", (req, res) => {});
