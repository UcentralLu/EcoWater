// Menú móvil
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Carrito de compras (funcionalidad básica)
let carrito = [];

document.querySelectorAll('.producto-cta').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Evita la navegación por ahora
        const productoCard = button.closest('.producto-card');
        const producto = productoCard.querySelector('.producto-titulo').textContent;
        const precioTexto = productoCard.querySelector('.producto-precio').textContent;
        const precio = parseFloat(precioTexto.replace('€', '').trim());
        carrito.push({ producto, precio });
        actualizarCarrito();
        alert("${producto} añadido al carrito."); // Feedback básico
    });
});

function actualizarCarrito() {
    document.querySelector('.carrito-contador').textContent = carrito.length;
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const carouselContainer = document.querySelector('.productos-carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const prevButton = document.querySelector('.prev-arrow');
const nextButton = document.querySelector('.next-arrow');
const cards = document.querySelectorAll('.producto-card');

let currentIndex = 0;
let intervalId;
const scrollSpeed = 3000; // Milisegundos entre cada desplazamiento automático
// Obtener el valor del gap del CSS
const gridStyles = getComputedStyle(document.querySelector('.productos-grid'));
const cardMarginRight = parseFloat(gridStyles.gap) || 25; // Usar gap si está definido, sino 25px por defecto
const scrollAmount = cards[0]?.offsetWidth + cardMarginRight;

function scrollToCard(index) {
    console.log('scrollToCard llamado con índice:', index);
    console.log('offsetLeft de la tarjeta:', cards[index]?.offsetLeft);
    carouselSlide.scrollLeft = cards[index]?.offsetLeft;
    console.log('carouselSlide.scrollLeft después:', carouselSlide.scrollLeft);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
}

function startAutoScroll() {
    intervalId = setInterval(nextSlide, scrollSpeed);
}

function stopAutoScroll() {
    clearInterval(intervalId);
}

// Event listeners para las flechas
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        console.log('Botón previo clickeado');
        stopAutoScroll();
        prevSlide();
        startAutoScroll();
    });

    nextButton.addEventListener('click', () => {
        console.log('Botón siguiente clickeado');
        stopAutoScroll();
        nextSlide();
        startAutoScroll();
    });

    // Iniciar el scroll automático al cargar la página
    startAutoScroll();

    // Detener el scroll automático al hacer hover sobre el carrusel
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);

    // Reanudar el scroll automático al quitar el hover del carrusel
    carouselContainer.addEventListener('mouseleave', startAutoScroll);
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita la recarga de la página por ahora
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Intentando iniciar sesión con:', email, password);
            // Aquí podrías agregar la lógica para enviar los datos al servidor
            alert('¡Inicio de sesión simulado!');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    const loginForm = document.querySelector('.login-form');
   /* if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
           // event.preventDefault(); // Evita la recarga de la página por ahora
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Intentando iniciar sesión con:', email, password);
            // Aquí podrías agregar la lógica para enviar los datos al servidor
            alert('¡Inicio de sesión simulado!');
        });
    }*/
});

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const registerForm = document.querySelector('.register-form');

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita la recarga de la página por ahora
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const terms = document.querySelector('input[name="terms"]').checked;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (!terms) {
                alert('Debes aceptar los Términos y Condiciones.');
                return;
            }

            console.log('Intentando registrar con:', nombre, email, password, confirmPassword, terms);
            // Aquí podrías agregar la lógica para enviar los datos al servidor
            alert('¡Registro simulado!');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.querySelector('.forgot-password-form');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita la recarga de la página por ahora
            const email = document.getElementById('email').value;

            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            console.log('Solicitud de restablecimiento enviada para:', email);
            // Aquí podrías agregar la lógica para enviar la solicitud al servidor
            alert('Se ha enviado un enlace de restablecimiento a tu correo electrónico (simulado).');
        });
    }

    function isValidEmail(email) {
        // Una validación de correo electrónico básica
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

