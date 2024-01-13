const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

// Función para realizar la solicitud y manejar los errores
async function solicitud(url, method, data) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log('Response:', result);  // Add this line for debugging
        return result;
    } catch (error) {
        throw new Error(Error en la solicitud: ${error.message});
    }
}

// Rutas
app.get('/mostrarJugadores', async (req, res) => {
    const url = 'http://localhost:8080/mostrar'; // Update the URL for showing players

    try {
        const data = await solicitud(url, 'GET');
        res.json(data);
        console.log(Estas mostrando datos en ${url});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/guardarJugador', async (req, res) => {
    const datos = req.body;
    const url = 'http://localhost:8080/guardar'; // Update the URL for saving players

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const result = await response.json();

        console.log(Estas guardando datos en ${url});
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al guardar jugador:', error);
        res.status(500).json({ error: 'Error al guardar jugador' });
    }
});

app.put('/actualizarJugador/:id', async (req, res) => {
    const id = req.params.id;
    const datos = req.body;
    const url = http://localhost:8200/actualizarJugador/${id}; // Update the URL for updating players

    try {
        const data = await solicitud(url, 'PUT', datos);
        res.json(data);
        console.log(Estas actualizando datos en ${url});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/eliminarJugador/:id', async (req, res) => {
    const id = req.params.id;
    const url = http://localhost:8200/eliminarJugador/${id}; // Update the URL for deleting players

    try {
        const data = await solicitud(url, 'DELETE');
        res.json(data);
        console.log(Estas eliminando datos en ${url});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log(Servidor de orquestación escuchando en puerto 3000);
});