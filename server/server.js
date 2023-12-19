const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/diveredu', { useNewUrlParser: true, useUnifiedTopology: true });

// Rutas (añadirás más rutas según tu aplicación)
app.get('/', (req, res) => {
  res.send('¡Bienvenido a DiverEdu!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
