const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const connection = await pool.getConnection();

    const [rows] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);

    connection.release();

    if (rows.affectedRows > 0) {
      res.json({ message: `Producto con ID: ${productId} eliminado correctamente` });
    } else {
      res.status(404).json({ error: `Producto con ID: ${productId} no encontrado` });
    }
  } catch (err) {
    console.error('Error al eliminar el producto:', err.message);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  deleteProduct,
};
