const Subcategory = require("../models/subcategory");
const ErrorHandler = require("../utils/errorHandler");

exports.getSubcategories = async (req, res) => {
  try {
    const categories = await Subcategory.find().populate("parentCategory");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubcategoriesByParentCategory = async (req, res, next) => {
  try {
    const { parentCategoryId } = req.params;

    // Find all subcategories with the given parent category ID
    const subcategories = await Subcategory.find({ parentCategory: parentCategoryId })
      .populate("parentCategory", "name"); 

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for this category",
      });
    }

    res.status(200).json({
      success: true,
      subcategories,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};


exports.createSubcategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const newSubcategory = new Subcategory({ name, parentCategory });
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update Subcategory
exports.updateSubcategory = async (req, res) => {
  const { id } = req.params;
  const { name, parentCategory } = req.body;

  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, parentCategory },
      { new: true, runValidators: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
// Get Single Subcategory
exports.getSubcategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Subcategory.findById(id).populate('parentCategory');

    if (!category) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};
