const sqlite3 = require('sqlite3').verbose(); // Esto carga la biblioteca para usar SQLite
const path = require('path'); // Esto carga la biblioteca para manejar rutas de archivos

// Ruta donde guardaremos la base de datos (archivo .db)
const dbPath = path.resolve(__dirname, 'usuarios.db');
const db = new sqlite3.Database(dbPath); // Aquí creamos la conexión a la base de datos

// Creamos la tabla de usuarios si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        codigo TEXT NOT NULL,
        contrasena TEXT NOT NULL,
        fechaRegistro TEXT NOT NULL,
        fechaVencimiento TEXT NOT NULL
    )`);
});

module.exports = db; // Exportamos la conexión para poder usarla en otros archivos
