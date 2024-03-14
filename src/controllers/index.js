const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const salt = bcrypt.genSaltSync(10);

const service = {
  register: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(200).json({
          EM: "Missing required parameters", //error message
          EC: "1", //error code
          DT: "", //data
        });
      }

      // check email
      const checkEmail = await User.findOne({ email: req.body.email });
      if (checkEmail) {
        return res.status(200).json({
          EM: "The email is already exist!", //error message
          EC: "1", //error code
          DT: "", //data
        });
      }

      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      return res.status(200).json({
        EM: "A user is created succesfully", //error message
        EC: "1", //error code
        DT: "", //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },
};

module.exports = service;
