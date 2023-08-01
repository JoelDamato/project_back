const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para crear un producto en la base de datos
const createProducts = (req, res) => {
  const { name, description, category, image } = req.body;

  // Establecer la conexión a la base de datos MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
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

        // Cerrar la conexión con la base de datos MySQL
        connection.end();
      });
    }
  });
};

module.exports = {
  createProducts,
};
