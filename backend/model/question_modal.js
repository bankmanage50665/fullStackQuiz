const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: Array, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
