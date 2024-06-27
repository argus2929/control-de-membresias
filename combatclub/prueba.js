const { agregarUsuario } = require('./usuarios'); // Importamos la función para agregar usuarios

// Datos del nuevo usuario que queremos agregar
const nuevoUsuario = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    codigo: '12345',
    contrasena: 'secreta',
    fechaRegistro: '2024-06-27', // Puedes generar esta fecha automáticamente en tu aplicación
    fechaVencimiento: '2024-07-27' // Puedes calcular automáticamente 30 días después de la fecha de registro
};

// Llamamos a la función para agregar el nuevo usuario
agregarUsuario(nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.codigo, nuevoUsuario.contrasena,
               nuevoUsuario.fechaRegistro, nuevoUsuario.fechaVencimiento)
    .then(usuario => {
        console.log('Usuario agregado:', usuario); // Mostramos en la consola el usuario que agregamos
    })
    .catch(error => {
        console.error('Error al agregar usuario:', error); // Manejamos cualquier error que ocurra
    });
