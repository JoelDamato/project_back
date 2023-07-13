const sqlite3 = require('sqlite3').verbose();

// Ruta al archivo de la base de datos SQLite
const DB_PATH = 'C:/Users/JB/OneDrive/Escritorio/projectoj.db';



// Función para obtener todos los usuarios de la base de datos
const getUsers = (req, res) => {
  // Crear una nueva instancia de la base de datos SQLite
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'SELECT * FROM users';

      db.all(sql, (err, rows) => {
        if (err) {
          console.error('Error al obtener los usuarios:', err.message);
          res.status(500).json({ error: 'Error al obtener los usuarios' });
        } else {
          res.json(rows);
        }
      });
    }

    // Cerrar la conexión con la base de datos SQLite
    db.close();
  });
};

module.exports = {
  getUsers,
};