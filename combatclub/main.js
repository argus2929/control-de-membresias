const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const formData = new FormData(formulario);
    const datosUsuario = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        codigo: formData.get('codigo'),
        contrasena: formData.get('contrasena')
    };

    try {
        const respuesta = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        if (respuesta.ok) {
            const resultado = await respuesta.json();
            alert(resultado.mensaje); // Muestra mensaje de éxito
            formulario.reset(); // Limpia el formulario después del registro exitoso
        } else {
            throw new Error('Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar usuario');
    }
});
