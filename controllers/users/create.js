const sqlite3 = require('sqlite3').verbose();

// Ruta al archivo de la base de datos SQLite
const DB_PATH = 'C:/Users/JB/OneDrive/Escritorio/projectoj.db';

const createUser = (req, res) => {
    const { name, password, mail, photo } = req.body;
    let role = 1
  
    // Crear una nueva instancia de la base de datos SQLite
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        res.status(500).json({ error: 'Error al conectar a la base de datos' });
      } else {
        const sql = 'INSERT INTO users (name, password, mail, photo, role) VALUES (?, ?, ?, ?, ?)';
        const values = [name, password, mail, photo, role];
        
  
        db.run(sql, values, function (err) {
          if (err) {
            console.error('Error al crear el usuario:', err.message);
            res.status(500).json({ error: 'Error al crear el usuario' });
          } else {
            const userId = this.lastID;
            res.json({ id: userId, name, password, mail });
          }
        });
      }
  

    // Cerrar la conexión con la base de datos SQLite
    db.close();
  });
};

module.exports = {
    createUser,
};