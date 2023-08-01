const jwt = require("jsonwebtoken");
const mysql = require('mysql');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const loginUser = (req, res) => {
  const { email, password } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err.message);
      return res.status(500).json({ error: "Error de servidor" });
    }
    console.log("Conexión exitosa a la base de datos MySQL");

    // Buscar el usuario en la base de datos
    const query = `SELECT * FROM users WHERE mail = ? AND password = ?`;
    connection.query(query, [email, password], (err, user) => {
      if (err) {
        console.error("Error al buscar el usuario:", err.message);
        return res.status(500).json({ error: "Error de servidor" });
      }

      if (!user || user.length === 0) {
        return res.status(401).json({ error: "Los datos son incorrectos" });
      }

      // Generar el token JWT para el usuario autenticado
      const token = jwt.sign({ userId: user[0].id }, "secret_key", { expiresIn: "1h" });

      res.json({ token });

      // Cerrar la conexión a la base de datos después de realizar la operación
      connection.end((err) => {
        if (err) {
          console.error("Error al cerrar la conexión a la base de datos:", err.message);
        } else {
          console.log("Conexión a la base de datos cerrada");
        }
      });
    });
  });
};

module.exports = {
  loginUser,
};
