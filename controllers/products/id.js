const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [productId]);

    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ message: `Producto con ID ${productId} no encontrado` });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Error al obtener el producto:', err.message);
    res.status(500).json({ error: 'Error de servidor' });
  }
};

module.exports = {
  getProductById,
};
