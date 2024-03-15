const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Manga = new Schema({
  name: { type: String, required: true },
  lastChapter: { type: String, required: true },
  updatedAt: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Manga", Manga);
