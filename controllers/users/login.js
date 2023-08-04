const mysql = require('mysql');
const jwt = require("jsonwebtoken");

require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const loginUser = (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error al obtener conexión del pool:", err.message);
      return res.status(500).json({ error: "Error de servidor" });
    }

    const query = `SELECT * FROM users WHERE mail = ? AND password = ?`;
    connection.query(query, [email, password], (err, user) => {
      // Liberar la conexión para que pueda ser reutilizada por otros
      connection.release();

      if (err) {
        console.error("Error al buscar el usuario:", err.message);
        return res.status(500).json({ error: "Error de servidor" });
      }

      if (!user || user.length === 0) {
        return res.status(401).json({ error: "Los datos son incorrectos" });
      }

      const token = jwt.sign({ userId: user[0].id }, "secret_key", { expiresIn: "1h" });
      res.json({ token });
    });
  });
};

module.exports = {
  loginUser,
};
