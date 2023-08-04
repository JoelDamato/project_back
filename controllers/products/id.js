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

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    // Obtener una conexión del pool
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error al obtener conexión del pool:', err.message);
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });

    const sql = 'SELECT * FROM products WHERE id = ?';

    // Realizar la consulta a la base de datos MySQL con el ID proporcionado
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [productId], (err, result) => {
        // Liberar la conexión para que pueda ser reutilizada por otros
        connection.release();

        if (err) {
          console.error('Error al obtener el producto:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length === 0) {
      res.status(404).json({ message: `Producto con ID  ${productId} no encontrado` });
    } else {
      res.json(result[0]); // Devolver el primer resultado (debería ser único ya que buscamos por ID)
    }
  } catch (err) {
    res.status(500).json({ error: 'Error de servidor' });
  }
};

module.exports = {
  getProductById,
};
