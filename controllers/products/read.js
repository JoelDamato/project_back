const mysql = require('mysql');
require('dotenv').config();

// Configuración del pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  connectionLimit: 10, // Establece el número máximo de conexiones en el pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para obtener todos los productos de la base de datos
const getProducts = (req, res) => {
  // Obtener una conexión del pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del pool:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'SELECT * FROM products';

      // Realizar la consulta a la base de datos MySQL
      connection.query(sql, (err, rows) => {
        // Liberar la conexión para que pueda ser reutilizada por otros
        connection.release();

        if (err) {
          console.error('Error al obtener los productos:', err.message);
          res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
          res.json(rows);
        }
      });
    }
  });
};

module.exports = {
  getProducts,
};
