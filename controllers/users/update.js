const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para modificar los datos de un usuario en la base de datos
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, password, mail, photo } = req.body;



  // Crear una nueva instancia de la base de datos SQLite
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'UPDATE users SET name = ?, password = ?, mail = ?, photo = ? WHERE id = ?';
      const values = [name, password, mail, photo, userId];

      db.run(sql, values, function (err) {
        if (err) {
          console.error('Error al modificar los datos del usuario:', err.message);
          res.status(500).json({ error: 'Error al modificar los datos del usuario' });
        } else {
          res.json({ message: 'Datos del usuario modificados correctamente' });
        }
      });
    }

    // Cerrar la conexión con la base de datos SQLite
    db.close();
  });
};

module.exports = {
  updateUser,
};
