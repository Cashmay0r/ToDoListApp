import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

import mongoose from "mongoose";

const app = express();

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

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});
