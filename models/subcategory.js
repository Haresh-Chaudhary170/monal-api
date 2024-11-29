const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true, // Ensures every subcategory is linked to a category
  },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
