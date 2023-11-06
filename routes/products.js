const express = require('express');
const router = express.Router();
const readController = require('../controllers/products/read');
const createController = require('../controllers/products/create.js');
const deleteController = require('../controllers/products/delete');
const readIdController = require('../controllers/products/id');

router.get('/', readController.getProducts);
router.post('/new', createController.createProduct);
router.delete('/delete/:id', deleteController.deleteProduct);
router.get('/:id', readIdController.getProductById);

module.exports = router;