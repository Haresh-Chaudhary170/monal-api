const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  inGlass:{
    type: String,
    enum: ["glass", "bottle"],
    default: "glass"
  }
});

module.exports = mongoose.model("Item", itemSchema);
