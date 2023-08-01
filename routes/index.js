const express = require('express');
const router = express.Router();

// Importa las rutas específicas que deseas agregar
const usersRoutes = require('./users');
const productsRoutes = require('./products');

// Configura las rutas
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
