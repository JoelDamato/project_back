const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createUser = (req, res) => {
  const { name, password, mail, photo } = req.body;
  let role = 1;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del pool:', err.message);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    } else {
      const sql = 'INSERT INTO users (name, password, mail, photo, role) VALUES (?, ?, ?, ?, ?)';
      const values = [name, password, mail, photo, role];

      connection.query(sql, values, (err, result) => {
        connection.release(); // Liberar la conexión para que pueda ser reutilizada por otros

        if (err) {
          console.error('Error al crear el usuario:', err.message);
          res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
          const userId = result.insertId;
          res.json({ id: userId, name, password, mail });
        }
      });
    }
  });
};

module.exports = {
  createUser,
};
