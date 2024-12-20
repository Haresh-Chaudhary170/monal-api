const express = require('express');
const { getSubcategories, createSubcategory, getSubcategoryById, updateSubcategory, deleteSubcategory, getSubcategoriesByParentCategory } = require('../controllers/subcategoryController');
const { isAuthenticatedAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/subcategories', getSubcategories);

router.route('/subcategories/add').post(isAuthenticatedAdmin, createSubcategory);
router.get('/subcategories/:id', getSubcategoryById);
router.get('/subcategori/:parentCategoryId', getSubcategoriesByParentCategory);

router.route('/subcategories/:id').put(isAuthenticatedAdmin, updateSubcategory);
router.route('/subcategories/:id').delete(isAuthenticatedAdmin, deleteSubcategory)


module.exports = router;
