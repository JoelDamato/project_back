const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 0, // Número máximo de conexiones en el pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const deleteUser = (req, res) => {
  const userId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del pool:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'DELETE FROM users WHERE id = ?';

      connection.query(sql, [userId], (err, result) => {
        connection.release(); // Liberar la conexión para que pueda ser reutilizada por otros

        if (err) {
          console.error('Error al eliminar el usuario:', err.message);
          res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
          // El resultado 'affectedRows' indica cuántas filas se eliminaron
          if (result.affectedRows > 0) {
            res.json({ message: `Usuario con ID: ${userId} eliminado correctamente` });
          } else {
            res.status(404).json({ error: `Usuario con ID: ${userId} no encontrado` });
          }
        }
      });
    }
  });
};

module.exports = {
  deleteUser,
};
