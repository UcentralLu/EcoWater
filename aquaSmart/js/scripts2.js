document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.querySelector('.filter-sidebar');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productosGrid = document.querySelector('.productos-grid');

    let productos = [ // Simulación de datos de productos (esto vendría de un backend)
        {
            id: 1, nombre: 'Grifería Bajo Flujo Premium', tipo: 'griferia', marca: 'eco', capacidad: 'bajo', precio: 240000,
            descripcionBreve: 'Grifería cromada con aireador ahorrador de agua.', oferta: true, imagen: 'https://th.bing.com/th/id/OIP.yOnu4iLCjl6NXVKhNBe1iwHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        },
        {
            id: 2, nombre: 'Llave Ahorro Doble Función', tipo: 'griferia', marca: 'waterplus', capacidad: 'bajo', precio: 265000,
            descripcionBreve: 'Con doble función para agua fría y caliente, reduce el consumo.', nuevo: true, imagen: 'https://corona.co/medias/O21680001-ahorraro-doble-vista-1.jpg?context=bWFzdGVyfGltYWdlc3wyODQ5NDB8aW1hZ2UvanBlZ3xhRGxoTDJneU15ODVNakV5TkRFd01EQXpORGcyTDA4eU1UWTRNREF3TVMxaGFHOXljbUZ5Ynkxa2IySnNaUzEyYVhOMFlTMHhMbXB3Wnd8ODllNGMwZjcwNTgwOTQ2NTZiYjc1NjIzOGIyMTVjZTM1MTA1MGM4ZDA5MzMyYTFiMTg5Y2NiODk5MjE3ZDEzMA'
        },
        {
            id: 3, nombre: 'Grifo Sensor EcoTouch', tipo: 'griferia', marca: 'flowtech', capacidad: 'automatico', precio: 370000,
            descripcionBreve: 'Grifo inteligente con sensor infrarrojo.', oferta: true, imagen: 'https://http2.mlstatic.com/D_NQ_NP_715724-MCO74520336741_022024-O.webp'
        },
        {
            id: 4, nombre: 'Grifería Monomando AquaSave', tipo: 'griferia', marca: 'aqualux', capacidad: 'bajo', precio: 285000,
            descripcionBreve: 'Diseño moderno con sistema de ahorro incorporado.', nuevo: true, imagen: 'https://i.ebayimg.com/images/g/YdEAAeSwMkxnxyIK/s-l225.jpg'
        },
        {
            id: 5, nombre: 'Llave Push WaterSafe', tipo: 'griferia', marca: 'waterplus', capacidad: 'automatico', precio: 355000,
            descripcionBreve: 'Activa el flujo solo al presionar.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_601600-MCO74774771060_032024-O.webp'
        },
        {
            id: 6, nombre: 'Grifería Touchless SmartFlow', tipo: 'griferia', marca: 'flowtech', capacidad: 'automatico', precio: 480000,
            descripcionBreve: 'Sin contacto, ideal para higiene y ahorro.', nuevo: true, imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_912928-CBT48349998390_112021-F.webp'
        },

        {
            id: 7, nombre: 'Cabezal Ducha EcoRain', tipo: 'ducha', marca: 'eco', capacidad: 'bajo', precio: 190000,
            descripcionBreve: 'Cabezal con microboquillas para presión eficiente con bajo consumo de agua.',
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_836659-MCO82408073549_022025-O.webp'
        },
        {
            id: 8, nombre: 'Ducha EcoSpray LED', tipo: 'ducha', marca: 'waterplus', capacidad: 'bajo', precio: 250000,
            descripcionBreve: 'Cambia de color según temperatura e incluye aireador para ahorro de agua.',
            imagen: 'https://apreciosderemate.com/51027-medium_default/ducha-shower-led-en-colores-con-sensor-de-temperatura-spa.jpg'
        }

        ,{
            id: 9, nombre: 'Sistema Doble Descarga SmartFlush', tipo: 'bano', marca: 'eco', capacidad: 'automatico', precio: 295000,
            descripcionBreve: 'Doble descarga: 3L/6L para ahorro eficiente de agua en cada uso.',
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsKT8TbF80taYTdZTdUX6kaC_AowpIZg26OA&s'
        },
        {
            id: 10, nombre: 'Kit Ahorro Sanitario Compacto', tipo: 'bano', marca: 'aqualux', capacidad: 'bajo', precio: 230000,
            descripcionBreve: 'Incluye válvulas de descarga de bajo caudal y sistema de control de flujo.',
            imagen: 'https://http2.mlstatic.com/D_Q_NP_2X_713998-MCO46803109587_072021-E.webp'
        }                                       
        
        ,{
            id: 15, nombre: 'Aireador para Llave de Cocina', tipo: 'cocina', marca: 'eco', capacidad: 'bajo', precio: 175000,
            descripcionBreve: 'Dispositivo que mezcla aire con agua reduciendo el caudal hasta en un 50%.',
            imagen: 'https://ae01.alicdn.com/kf/HTB1J3aNacTxK1Rjy0Fgq6yovpXai/Kitchen-Faucet-Aerator-2-Modes-360-Diffuser-Degree-adjustable-Water-Filter-Diffuser-Water-Saving-Nozzle-Faucet.jpg'
        },        
        
    ];

    function mostrarProductos(productosFiltrados) {
        productosGrid.innerHTML = ''; // Limpiar la lista actual
        if (productosFiltrados.length === 0) {
            productosGrid.innerHTML = '<p>No se encontraron productos con los filtros seleccionados.</p>';
            return;
        }
        productosFiltrados.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">${producto.precio}€</p>
                <p class="descripcion-breve">${producto.descripcionBreve}</p>
                <button class="add-to-cart-btn" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">Agregar al carrito</button>
                ${producto.oferta ? '<span class="etiqueta oferta">En oferta</span>' : ''}
                ${producto.nuevo ? '<span class="etiqueta nuevo">Nuevo</span>' : ''}
                `;
            productosGrid.appendChild(productoCard);
        });

        // Adjuntar event listeners a los botones "Agregar al carrito"
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', agregarAlCarrito);
        });
    }

    function filtrarProductos() {
        const filtrosActivos = {
            tipo: [],
            marca: [],
            capacidad: []
        };

        document.querySelectorAll('.filter-sidebar input[type="checkbox"]:checked').forEach(checkbox => {
            filtrosActivos[checkbox.name].push(checkbox.value);
        });

        const productosFiltrados = productos.filter(producto => {
            let cumpleFiltros = true;
            for (const filtro in filtrosActivos) {
                if (filtrosActivos[filtro].length > 0 && !filtrosActivos[filtro].includes(producto[filtro])) {
                    cumpleFiltros = false;
                    break;
                }
            }
            return cumpleFiltros;
        });

        mostrarProductos(productosFiltrados);
    }

    function buscarProductos(termino) {
        const terminoLower = termino.toLowerCase();
        const productosBuscados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(terminoLower) ||
            producto.descripcionBreve.toLowerCase().includes(terminoLower)
        );
        mostrarProductos(productosBuscados);
    }

    function agregarAlCarrito(event) {
        const producto = {
            id: parseInt(event.target.dataset.id),
            nombre: event.target.dataset.nombre,
            precio: parseFloat(event.target.dataset.precio),
            imagen: event.target.dataset.imagen,
            cantidad: 1
        };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carrito.findIndex(p => p.id === producto.id);

        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito(); // Asegúrate de que esta función esté definida globalmente o en ambos scripts
        event.target.classList.add('agregado-al-carrito');
        event.target.textContent = 'Agregado ✔';
    }

    if (filterForm) {
        filterForm.addEventListener('change', filtrarProductos);
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            buscarProductos(searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                buscarProductos(searchInput.value);
            }
        });
    }

    // Mostrar todos los productos al cargar la página
    mostrarProductos(productos);
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