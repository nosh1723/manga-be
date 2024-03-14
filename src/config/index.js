const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev");
    console.log("connect db successfully");
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = { connect };
