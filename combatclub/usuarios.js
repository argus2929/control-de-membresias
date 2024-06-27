const db = require('./database'); // Importamos la conexión a la base de datos desde database.js

// Función para agregar un usuario nuevo
function agregarUsuario(nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento) {
    return new Promise((resolve, reject) => {
        // Preparamos la consulta para insertar un nuevo usuario
        const stmt = db.prepare(`INSERT INTO usuarios (nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento) 
                                 VALUES (?, ?, ?, ?, ?, ?)`);

        // Ejecutamos la consulta con los datos del nuevo usuario
        stmt.run(nombre, email, codigo, contrasena, fechaRegistro, fechaVencimiento, function(err) {
            if (err) {
                reject(err); // Si hay un error, lo mandamos de vuelta
            } else {
                // Si todo sale bien, devolvemos la información del nuevo usuario agregado
                resolve({ id: this.lastID, nombre, email, codigo, fechaRegistro, fechaVencimiento });
            }
        });

        stmt.finalize(); // Finalizamos la consulta
    });
}

module.exports = {
    agregarUsuario // Exportamos la función para poder usarla en otros archivos
};
