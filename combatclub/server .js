const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./usuarios.db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/usuarios', async (req, res) => {
    const { nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento } = req.body;
    
    const sql = `INSERT INTO usuarios (nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento, membresiaPagada) 
                 VALUES (?, ?, ?, ?, ?, ?, 0)`;
    
    db.run(sql, [nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento], function(err) {
        if (err) {
            console.error('Error al insertar usuario:', err.message);
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        console.log(`Usuario registrado con ID: ${this.lastID}`);
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: { id: this.lastID, nombre, email, codigo, fechaRegistro, fechaVencimiento }
        });
    });
});

app.get('/usuarios/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    
    const sql = `SELECT id, nombre, email, codigo, fechaRegistro, fechaVencimiento, membresiaPagada FROM usuarios WHERE codigo = ?`;
    
    db.get(sql, [codigo], (err, row) => {
        if (err) {
            console.error('Error al buscar usuario:', err.message);
            return res.status(500).json({ error: 'Error al buscar usuario' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({
            id: row.id,
            nombre: row.nombre,
            email: row.email,
            codigo: row.codigo,
            fechaRegistro: row.fechaRegistro,
            fechaVencimiento: row.fechaVencimiento,
            membresiaPagada: row.membresiaPagada === 1 // Convertir a booleano si es necesario
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
