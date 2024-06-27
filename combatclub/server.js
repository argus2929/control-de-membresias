const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Importa SQLite3
const db = new sqlite3.Database('./usuarios.db'); // Conecta con la base de datos SQLite

const app = express();
const PORT = process.env.PORT || 3000; // Puerto del servidor

// Middleware para parsear JSON en solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir archivos estáticos (como index.html y cucu.css)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la solicitud POST de registro de usuarios
app.post('/usuarios', async (req, res) => {
    const { nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento } = req.body;
    
    // Ejemplo de inserción en la base de datos SQLite
    const sql = `INSERT INTO usuarios (nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
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

// Ruta para manejar la solicitud GET para buscar usuario por código
app.get('/usuarios/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    
    // Ejemplo de consulta en la base de datos SQLite
    const sql = `SELECT * FROM usuarios WHERE codigo = ?`;
    
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
            fechaVencimiento: row.fechaVencimiento
        });
    });
});

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
