const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getProducts = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM products');

    connection.release();

    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los productos:', err.message);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

module.exports = {
  getProducts,
};
