const bcrypt = require("bcrypt");
const User = require("../models/User");
const Manga = require("../models/Manga");

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

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      return res.status(200).json({
        EM: "A user is created succesfully", //error message
        EC: "0", //error code
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

  login: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(200).json({
          EM: "Missing required parameters", //error message
          EC: "1", //error code
          DT: "", //data
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const checkPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (checkPassword) {
          return res.status(200).json({
            EM: "OK", //error message
            EC: "0", //error code
            DT: user, //data
          });
        }
      }

      return res.status(200).json({
        EM: "Email or password not exist", //error message
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

  createManga: async (req, res) => {
    try {
      const checkManga = await Manga.findOne({ name: req.body.name });
      if (checkManga) {
        return res.status(200).json({
          EM: "Manga is already exist!", //error message
          EC: "1", //error code
          DT: "", //data
        });
      }

      await Manga.create({
        name: req.body.name,
        updatedAt: req.body.updatedAt,
        lastChapter: req.body.lastChapter,
        imageUrl: req.body.imageUrl,
      });

      return res.status(200).json({
        EM: "Create new manga successfully!", //error message
        EC: "0", //error code
        DT: "", //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server create manga", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },

  getAllManga: async (req, res) => {
    try {
      const PAGE_SIZE = 6;
      const page = req.query.page;
      const searchValue = req.query.search;
      const total = await Manga.countDocuments();
      if (page) {
        if (parseInt(page) < 1) page = 1;
        const skip = (parseInt(page) - 1) * PAGE_SIZE;
        const manga = await Manga.find({
          name: { $regex: searchValue || "", $options: "i" },
        })
          .skip(skip)
          .limit(PAGE_SIZE);
        return res.status(200).json({
          EM: "Get all manga successfully!", //error message
          EC: "0", //error code
          per_page: PAGE_SIZE,
          total,
          totalPage: Math.ceil(total / PAGE_SIZE),
          DT: manga, //data
        });
      }
      const manga = await Manga.find();
      return res.status(200).json({
        EM: "Get all manga successfully!", //error message
        EC: "0", //error code
        DT: manga, //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server get all manga", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },

  getManga: async (req, res) => {
    try {
      const manga = await Manga.findById(req.params.id);
      return res.status(200).json({
        EM: "Get a manga successfully!", //error message
        EC: "0", //error code
        DT: manga, //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server get all manga", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },

  updateManga: async (req, res) => {
    try {
      const checkManga = Manga.findById(req.params.id);
      if (!checkManga) {
        return res.status(200).json({
          EM: "Manga is not exist!", //error message
          EC: "1", //error code
          DT: "", //data
        });
      }

      await checkManga.updateOne({ $set: req.body });
      return res.status(200).json({
        EM: "Update manga successfully!", //error message
        EC: "0", //error code
        DT: "", //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server update manga!", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },

  deleteManga: async (req, res) => {
    try {
      await Manga.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        EM: "Delete successfully!", //error message
        EC: "0", //error code
        DT: "", //data
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server update manga!", //error message
        EC: "-1", //error code
        DT: "", //data
      });
    }
  },
};

module.exports = service;
