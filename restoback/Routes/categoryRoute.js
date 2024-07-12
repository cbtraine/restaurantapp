const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;
