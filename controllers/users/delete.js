const sqlite3 = require('sqlite3').verbose();

// Ruta al archivo de la base de datos SQLite
const DB_PATH = 'C:/Users/JB/OneDrive/Escritorio/projectoj.db';

// Función para eliminar un usuario de la base de datos
const deleteUser = (req, res) => {
  const userId = req.params.id;

  // Crear una nueva instancia de la base de datos SQLite
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'DELETE FROM users WHERE id = ?';

      db.run(sql, userId, function (err) {
        if (err) {
          console.error('Error al eliminar el usuario:', err.message);
          res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
          res.json({ message: `Usuario con ID: ${userId} Usuario eliminado correctamente` });
        }
      });
    }

    // Cerrar la conexión con la base de datos SQLiteu
    db.close();
  });
};

module.exports = {
  deleteUser,
};
