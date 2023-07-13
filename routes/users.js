const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users/users');
const createController = require('../controllers/users/create');
const deleteController = require('../controllers/users/delete');
const updateController = require('../controllers/users/update');

router.get('/', usersController.getUsers);
router.post('/new', createController.createUser);
router.delete('/delete/:id', deleteController.deleteUser);
router.put('/update/:id', updateController.updateUser);

module.exports = router;