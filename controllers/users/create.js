const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createUser = (req, res) => {
  const { name, password, mail, photo } = req.body;
  let role = 1;

  // Conectar a la base de datos MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'INSERT INTO users (name, password, mail, photo, role) VALUES (?, ?, ?, ?, ?)';
      const values = [name, password, mail, photo, role];

      // Realizar la inserción en la base de datos MySQL
      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al crear el usuario:', err.message);
          res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
          const userId = result.insertId;
          res.json({ id: userId, name, password, mail });
        }

        // Cerrar la conexión con la base de datos MySQL
        connection.end();
      });
    }
  });
};

module.exports = {
  createUser,
};
