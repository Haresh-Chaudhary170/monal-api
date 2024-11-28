const express = require('express');
const { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAuthenticatedAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/categories', getCategories);

router.route('/categories/add').post(isAuthenticatedAdmin, createCategory);
router.get('/categories/:id', getCategoryById);

router.route('/categories/:id').put(isAuthenticatedAdmin, updateCategory);
router.route('/categories/:id').delete(isAuthenticatedAdmin, deleteCategory)


module.exports = router;
