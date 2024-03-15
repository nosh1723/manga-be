const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect db successfully");
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = { connect };
