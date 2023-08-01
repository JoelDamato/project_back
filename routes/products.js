const express = require('express');
const router = express.Router();
const readController = require('../controllers/products/read');
const createController = require('../controllers/products/create');
const deleteController = require('../controllers/products/delete');

router.get('/', readController.getProducts);
router.post('/new', createController.createProducts);
router.delete('/delete/:id', deleteController.deleteProduct);

module.exports = router;