const mongoose = require("mongoose");
const subcategory = require("./subcategory");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  inGlass:{
    type: String,
    enum: ["glass", "bottle"],
    default: "glass"
  }
});

module.exports = mongoose.model("Item", itemSchema);
