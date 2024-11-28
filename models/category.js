const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
 },
  showInHome: { 
    type: String,
    required: true,
    default:0
 },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  type: { type: String, enum: ["food", "drink"], required: true },
});

module.exports = mongoose.model("Category", categorySchema);
