const express = require("express");
const router = express.Router();
const Calculation = require("../model/Calculation");

//to validate the incoming request body
const checkReqBody = (req, res, next) => {
  console.log(`Enter checkReqBody ${req}`);
  if (!req.body.calculation) {
    return res.status(400).send({ message: "calculation cannot be empty" });
  }
  next();
};

//@route POST  /
//@desc Save the calculation
//@access Public
router.post("/", checkReqBody, async (req, res) => {
  const newCalculation = new Calculation({ calculation: req.body.calculation });
  try {
    await newCalculation.save();
    res.status(200).send("Calculation saved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route GET  /
//@desc Get 10 recent calculations
//@access Public
router.get("/", async (req, res) => {
  try {
    const listOfcalculations = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.send(listOfcalculations);
  } catch (err) {
    res.status(500).send("Query failed for getting calculations");
  }
});

module.exports = router;
