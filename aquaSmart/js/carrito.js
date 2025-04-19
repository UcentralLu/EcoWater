document.addEventListener('DOMContentLoaded', () => {
    const carritoItemsContainer = document.querySelector('.carrito-items');
    const subtotalElement = document.querySelector('.subtotal');
    const envioElement = document.querySelector('.envio');
    const totalElement = document.querySelector('.total');

    // Función para renderizar los items del carrito en la página
    function renderizarCarrito() {
        carritoItemsContainer.innerHTML = ''; // Limpiar el contenido actual
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            carritoItemsContainer.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
            actualizarResumen(carrito);
            return;
        }

        carrito.forEach(item => {
            const carritoItemDiv = document.createElement('div');
            carritoItemDiv.classList.add('carrito-item');
            carritoItemDiv.innerHTML = `
                <div class="item-info">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="item-details">
                        <h3>${item.nombre}</h3>
                        <p class="precio">${item.precio.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="btn-menos" data-id="${item.id}">-</button>
                        <input type="number" value="${item.cantidad}" min="1" data-id="${item.id}">
                        <button class="btn-mas" data-id="${item.id}">+</button>
                    </div>
                    <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            carritoItemsContainer.appendChild(carritoItemDiv);
        });

        // Adjuntar event listeners a los botones
        const botonesMas = carritoItemsContainer.querySelectorAll('.btn-mas');
        const botonesMenos = carritoItemsContainer.querySelectorAll('.btn-menos');
        const botonesEliminar = carritoItemsContainer.querySelectorAll('.btn-eliminar');
        const inputsCantidad = carritoItemsContainer.querySelectorAll('.quantity-control input[type="number"]');

        botonesMas.forEach(boton => boton.addEventListener('click', aumentarCantidad));
        botonesMenos.forEach(boton => boton.addEventListener('click', disminuirCantidad));
        botonesEliminar.forEach(boton => boton.addEventListener('click', eliminarItem));
        inputsCantidad.forEach(input => input.addEventListener('change', actualizarCantidadInput));

        actualizarResumen(carrito);
        actualizarContadorCarrito(); // Asegúrate de que esta función esté definida globalmente o en ambos scripts
    }

    // Función para actualizar el resumen del pedido
    function actualizarResumen(carrito) {
        const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        const envio = subtotal > 0 ? 5.00 : 0.00; // Ejemplo de costo de envío
        const total = subtotal + envio;

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (envioElement) envioElement.textContent = `$${envio.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Funciones para manipular la cantidad y eliminar items
    function aumentarCantidad(event) {
        const itemId = parseInt(event.target.dataset.id);
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.map(item =>
            item.id === itemId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }

    function disminuirCantidad(event) {
        const itemId = parseInt(event.target.dataset.id);
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.map(item =>
            item.id === itemId && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
        );
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }

    function actualizarCantidadInput(event) {
        const itemId = parseInt(event.target.dataset.id);
        const nuevaCantidad = parseInt(event.target.value);
        if (nuevaCantidad >= 1) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito = carrito.map(item =>
                item.id === itemId ? { ...item, cantidad: nuevaCantidad } : item
            );
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    function eliminarItem(event) {
        const itemId = parseInt(event.target.dataset.id);
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.id !== itemId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }

    // Renderizar el carrito al cargar la página
    renderizarCarrito();
    actualizarContadorCarrito(); // Inicializar el contador al cargar la página
});

// Función para actualizar el contador del carrito en el header (debe ser global o estar en ambos scripts)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.carrito-contador').forEach(el => {
        el.textContent = totalCantidad;
    });
}