const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Función para obtener todos los usuarios de la base de datos
const getUsers = (req, res) => {
  // Crear una nueva instancia de la base de datos SQLite

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'SELECT * FROM users';

      // Realizar la consulta a la base de datos MySQL
      connection.query(sql, (err, rows) => {
        if (err) {
          console.error('Error al obtener los productos:', err.message);
          res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
          res.json(rows);
        }

        // Cerrar la conexión con la base de datos MySQL
        connection.end();
      });
    }
  });
};

module.exports = {
  getUsers,
};