const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de MySQL
const connection = mysql.createConnection({
  host: 'tu_host_de_mysql',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'liga_futbol',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Métodos CRUD

// Método GET para obtener todos los jugadores
app.get('/jugadores', (req, res) => {
  connection.query('SELECT * FROM jugadores', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Método GET para obtener un jugador por ID
app.get('/jugadores/:id', (req, res) => {
  const jugadorId = req.params.id;
  connection.query('SELECT * FROM jugadores WHERE id = ?', [jugadorId], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// Método POST para agregar un nuevo jugador
app.post('/jugadores', (req, res) => {
  const nuevoJugador = req.body;
  connection.query('INSERT INTO jugadores SET ?', [nuevoJugador], (error, results) => {
    if (error) throw error;
    res.json({ message: 'Jugador agregado correctamente', jugadorId: results.insertId });
  });
});

// Método PUT para actualizar un jugador por ID
app.put('/jugadores/:id', (req, res) => {
  const jugadorId = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE jugadores SET ? WHERE id = ?', [datosActualizados, jugadorId], (error) => {
    if (error) throw error;
    res.json({ message: 'Jugador actualizado correctamente' });
  });
});

// Método DELETE para eliminar un jugador por ID
app.delete('/jugadores/:id', (req, res) => {
  const jugadorId = req.params.id;
  connection.query('DELETE FROM jugadores WHERE id = ?', [jugadorId], (error) => {
    if (error) throw error;
    res.json({ message: 'Jugador eliminado correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
