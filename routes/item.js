const express = require('express');
const { getItems, createItem, getItemById, updateItem, deleteItem, getItemsByCategory } = require('../controllers/itemController');
const { isAuthenticatedAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/items', getItems);
router.get('/item/:subcategoryId', getItemsByCategory);
router.route('/items/add').post(isAuthenticatedAdmin, createItem);
router.get('/items/:id', getItemById);

router.route('/items/:id').put(isAuthenticatedAdmin, updateItem);
router.route('/items/:id').delete(isAuthenticatedAdmin, deleteItem);


module.exports = router;
