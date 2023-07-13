const express = require("express");
const app = express ();
const PORT = 8000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const DB_PATH = 'C:/Users/JB/OneDrive/Escritorio/projectoj.db';


const routes = require('./routes/index.js');

app.use(express.json());
app.get('/api', (req, res) => {
    res.send('¡Bienvenido a la API de J!');
  });
app.use('/api', routes);
app.listen(PORT, ()=> console.log("Express listening PORT:" + "http://localhost:" + PORT + "/api"))
app.use(bodyParser.json());

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite.');
  }
});
