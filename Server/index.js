const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//initialize express application
const app = express();
//importing the database connection
const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
//connecting to the database of MongoDB Atlas
connectDB();

//Define routes
const adminRoutes = require("./routes/calculation.routes");
app.use("/api", adminRoutes);

//Define the port
const PORT = process.env.PORT || 8000;
//Listening to server
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
