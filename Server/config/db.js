const mongoose = require("mongoose");

const url =
  "mongodb+srv://anushkaguptably:ZMrTprN7tx2fDZWN@mern-calculator-app.mylq7p1.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
