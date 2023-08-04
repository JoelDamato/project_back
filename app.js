const express = require("express");
const app = express ();
const PORT = 8000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const DB_PATH = 'C:/Users/JB/OneDrive/Escritorio/projectoj.db';
const cors = require('cors');

const routes = require('./routes/index.js');

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
    res.send('¡Bienvenido a la API de J!');
  });
app.use('/api', routes);
app.listen(PORT, ()=> console.log("Express listening PORT:" + "http://localhost:" + PORT + "/api"))
app.use(bodyParser.json());

