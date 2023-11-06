const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Función para crear un producto en la base de datos
const createProduct = (req, res) => {
  const { name, description, category, image } = req.body;

  const connection = mysql.createConnection(dbConfig); // Crear una nueva conexión para cada solicitud

  const sql = 'INSERT INTO products (name, description, category, image) VALUES (?, ?, ?, ?)';
  const values = [name, description, category, image];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear el producto:', err.message);
      res.status(500).json({ error: 'Error al crear el producto' });
    } else {
      const productId = result.insertId;
      res.json({ id: productId, name, description, category, image });
    }

    // Cerrar la conexión con la base de datos MySQL después de realizar la consulta
    connection.end();
  });
};

module.exports = {
  createProduct,
};
