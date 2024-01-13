const express = require('express');
const cors = require('cors');
const conexion = require('./Conexion.js');
const jwt = require('jsonwebtoken');
const app = express();
const claveSecreta = 'claveSecreta';
var tokenGenerado;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());


// Actualizar un jugador
app.put('/actualizarJugador/:id', (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    const sql = `UPDATE jugadores 
    SET nombre = ?, equipo = ?, nacionalidad = ?
    WHERE id = ?`;

    const values = [datos.nombre, datos.equipo, datos.nacionalidad, id];

    conexion.query(sql, values, function (err, results) {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            res.status(500).json({ error: "Error al actualizar el jugador" });
            return;
        }

        res.status(200).json({ message: "Actualización realizada" });
    });
});

// Crear credenciales (token JWT)
app.post('/crearCredenciales', (req, res) => {
    const datos = req.body;
    const idC = datos.id;
    const nombreC = datos.nombre;
    const token = jwt.sign({
        id: idC,
        nombre: nombreC,
    }, claveSecreta);

    res.json({
        tokenGen: token,
    });
    tokenGenerado = token;
});

// Eliminar un jugador por ID
app.delete('/eliminarJugador/:id', (req, res) => {
    const id = req.params.id;

    const sql = DELETE FROM jugadores WHERE id = ?;
    const values = [id];

    conexion.query(sql, values, function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error al eliminar el jugador" });
            return;
        }
        res.status(200).json({ message: "Jugador eliminado" });
    });
});

app.listen(8200, () => {
    console.log('Escuchando en puerto 8200');
});