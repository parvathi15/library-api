//packages
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //connecting to mongodb database

//environment variables in .env file
require("dotenv").config();

//express server
const app = express();
const port = process.env.PORT || 2000;

//cors middleware for sending and receiving json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI; //mondodbatlas dashboard database
mongoose.connect(uri, { useNewUrlParser: true,
  useUnifiedTopology: true, }); //flags
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//connection to routes
const recipeRouter = require("./routes/recipe.js");
app.use("/recipes", recipeRouter);


// app.use("/members", membersRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

