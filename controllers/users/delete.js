const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const deleteUser = (req, res) => {
  const userId = req.params.id;

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'DELETE FROM users WHERE id = ?';

      connection.query(sql, [userId], (err, result) => {
        if (err) {
          console.error('Error al eliminar el producto:', err.message);
          res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
          // El resultado 'affectedRows' indica cuántas filas se eliminaron
          if (result.affectedRows > 0) {
            res.json({ message: `Producto con ID: ${userId} eliminado correctamente` });
          } else {
            res.status(404).json({ error: `Producto con ID: ${userId} no encontrado` });
          }
        }

        // Cerrar la conexión con la base de datos MySQL
        connection.end();
      });
    }
  });
};


module.exports = {
  deleteUser,
};
