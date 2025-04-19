document.addEventListener('DOMContentLoaded', () => {
    const botonesOpcionPago = document.querySelectorAll('.btn-opcion-pago');
    const formularioTarjeta = document.getElementById('formulario-tarjeta');
    const formularioNequi = document.getElementById('formulario-nequi');
    const formTarjeta = document.getElementById('form-tarjeta');
    const formNequi = document.getElementById('form-nequi');
    const mensajeError = document.getElementById('mensaje-error');
    const mensajeExito = document.getElementById('mensaje-exito');
    const subtotalElement = document.querySelector('.subtotal');
    const envioElement = document.querySelector('.envio');
    const totalElement = document.querySelector('.total');

    // Cargar el resumen de la compra desde localStorage (o donde lo tengas)
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const envio = subtotal > 0 ? 5.00 : 0.00; // Ejemplo de costo de envío
    const total = subtotal + envio;

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (envioElement) envioElement.textContent = `$${envio.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;

    botonesOpcionPago.forEach(boton => {
        boton.addEventListener('click', function() {
            const metodo = this.dataset.metodo;
            formularioTarjeta.style.display = metodo === 'tarjeta' ? 'block' : 'none';
            formularioNequi.style.display = metodo === 'nequi' ? 'block' : 'none';
            // Ocultar otros formularios si los añades
        });
    });

    if (formTarjeta) {
        formTarjeta.addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí iría la lógica para enviar los datos de la tarjeta a tu backend
            // para procesar el pago a través de la pasarela de pago elegida.
            // **IMPORTANTE: Nunca proceses los datos de la tarjeta directamente en el frontend.**
            // Debes enviarlos de forma segura a tu servidor.

            // Simulación de pago exitoso (solo para la UI)
            mostrarMensaje('¡Pago realizado con éxito!', 'exito');
            setTimeout(() => {
                localStorage.removeItem('carrito'); // Limpiar el carrito
                window.location.href = '/pedido-confirmado.html'; // Redirigir a la página de confirmación
            }, 2000);
        });
    }

    if (formNequi) {
        formNequi.addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí iría la lógica para redirigir al usuario a la página de pago de Nequi.
            // Esto generalmente implica cambiar la `window.location.href` a la URL proporcionada
            // por la pasarela de pago de Nequi.

            // Simulación de redirección a Nequi (solo para la UI)
            mostrarMensaje('Redirigiendo a Nequi...', 'info');
            setTimeout(() => {
                window.location.href = 'https://www.nequi.com.co/'; // Reemplaza con la URL real de Nequi
            }, 1500);
        });
    }

    function mostrarMensaje(texto, tipo) {
        mensajeError.style.display = 'none';
        mensajeExito.style.display = 'none';
        if (tipo === 'error') {
            mensajeError.textContent = texto;
            mensajeError.style.display = 'block';
        } else if (tipo === 'exito') {
            mensajeExito.textContent = texto;
            mensajeExito.style.display = 'block';
        } else if (tipo === 'info') {
            mensajeExito.textContent = texto; // Usamos el estilo de éxito para mensajes informativos
            mensajeExito.style.display = 'block';
        }
    }

    // Actualizar el contador del carrito al cargar la página
    actualizarContadorCarrito();
});

// Función para actualizar el contador del carrito en el header (debe ser global o estar en ambos scripts)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.carrito-contador').forEach(el => {
        el.textContent = totalCantidad;
    });
}