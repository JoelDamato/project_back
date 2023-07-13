const express = require('express');
const router = express.Router();

// Importa las rutas específicas que deseas agregar
const usersRoutes = require('./users');

// Configura las rutas
router.use('/users', usersRoutes);

module.exports = router;
