"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");

// The `data-helpers` module provides an interface to the

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const DB            = require("mongodb");
const MONGODB_URI   = "mongodb://localhost:27017/tweetr";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");
// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the


