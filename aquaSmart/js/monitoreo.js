document.addEventListener('DOMContentLoaded', () => {
    const simulacionBtn = document.querySelector('.simulacion-btn');
    const simulacionOptions = document.querySelector('.simulacion-options');
    const simulacionItems = document.querySelectorAll('.simulacion-options li');
    const consumoChartCanvas = document.getElementById('consumoChart');
    const alertasContainer = document.getElementById('alertas-container');
    const consumoActualValor = document.getElementById('consumo-actual-valor');
    const ahorroDiarioValor = document.getElementById('ahorro-diario-valor');
    const metaMensualValor = document.getElementById('meta-mensual-valor');
    const alertasActivasValor = document.getElementById('alertas-activas-valor');
    let consumoChart;

    // Datos de simulación (incluyendo alertas y otros valores)
    const simulacionData = {
        normal: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            data: [10, 15, 8, 25, 12, 18, 10],
            backgroundColor: 'rgba(0, 128, 128, 0.2)',
            borderColor: 'rgba(0, 128, 128, 1)',
            label: 'Consumo (L/h)',
            consumoActual: 45,
            ahorroDiario: 1200,
            metaMensual: 65,
            alertas: [],
        },
        'consumo-alto': {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            data: [25, 30, 20, 45, 35, 40, 28],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            label: 'Consumo Alto (L/h)',
            consumoActual: 60,
            ahorroDiario: 950,
            metaMensual: 55,
            alertas: [{ tipo: 'consumo-elevado', mensaje: 'Consumo significativamente alto detectado.' }],
        },
        fuga: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            data: [5, 7, 6, 50, 48, 45, 42],
            backgroundColor: 'rgba(220, 53, 69, 0.2)',
            borderColor: 'rgba(220, 53, 69, 1)',
            label: 'Consumo con Fuga (L/h)',
            consumoActual: 55,
            ahorroDiario: 300,
            metaMensual: 30,
            alertas: [
                { tipo: 'fuga', mensaje: 'Posible fuga detectada en la tubería principal.' },
                { tipo: 'consumo-elevado', mensaje: 'El consumo se mantiene elevado.' },
            ],
        }
    };

    // Función para crear o actualizar la gráfica
    function updateChart(data) {
        if (consumoChart) {
            consumoChart.destroy();
        }
        consumoChart = new Chart(consumoChartCanvas, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.label,
                    data: data.data,
                    backgroundColor: data.backgroundColor,
                    borderColor: data.borderColor,
                    borderWidth: 2,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Consumo (L/h)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Hora'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Función para actualizar los widgets de información
    function updateInfoWidgets(data) {
        consumoActualValor.textContent = data.consumoActual;
        ahorroDiarioValor.textContent = data.ahorroDiario;
        metaMensualValor.textContent = data.metaMensual;
        alertasActivasValor.textContent = data.alertas.length;
    }

    // Función para actualizar las alertas
    function updateAlerts(alerts) {
        alertasContainer.innerHTML = ''; // Limpiar alertas anteriores
        alerts.forEach(alerta => {
            const alertaDiv = document.createElement('div');
            alertaDiv.classList.add('alerta', alerta.tipo);
            alertaDiv.innerHTML = `
                <div class="alerta-icon">${alerta.tipo === 'fuga' ? '❗' : '💧'}</div>
                <div class="alerta-info">
                    <h3>${alerta.tipo === 'fuga' ? 'Fuga detectada' : 'Consumo elevado'}</h3>
                    <p>${alerta.mensaje}</p>
                </div>
            `;
            alertasContainer.appendChild(alertaDiv);
        });
        if (alerts.length === 0) {
            const noAlertsDiv = document.createElement('div');
            noAlertsDiv.classList.add('alerta');
            noAlertsDiv.innerHTML = `<p>No hay alertas activas.</p>`;
            alertasContainer.appendChild(noAlertsDiv);
        }
    }

    // Mostrar/ocultar el menú de simulación
    simulacionBtn.addEventListener('click', () => {
        simulacionOptions.classList.toggle('show');
    });

    // Cambiar la vista de simulación al seleccionar una opción
    simulacionItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            const selectedData = simulacionData[type];
            updateChart(selectedData);
            updateInfoWidgets(selectedData);
            updateAlerts(selectedData.alertas);
            simulacionOptions.classList.remove('show');
            simulacionBtn.textContent = `Simulación: ${this.textContent} `;
            const arrowIcon = document.createElement('svg');
            arrowIcon.setAttribute('viewBox', '0 0 16 16');
            arrowIcon.setAttribute('fill', 'currentColor');
            arrowIcon.setAttribute('style', 'margin-left: 5px; vertical-align: middle; width: 1em; height: 1em;');
            arrowIcon.innerHTML = '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>';
            simulacionBtn.appendChild(arrowIcon);
        });
    });

    // Inicializar la página con la vista normal
    const initialData = simulacionData.normal;
    updateChart(initialData);
    updateInfoWidgets(initialData);
    updateAlerts(initialData.alertas);

    // Cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!simulacionBtn.contains(event.target) && !simulacionOptions.contains(event.target)) {
            simulacionOptions.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modalMetas = document.getElementById('modal-metas');
    const btnPersonalizarMetas = document.querySelector('.personalizar-metas');
    const closeButton = document.querySelector('.close-button');
    const formMetas = document.getElementById('form-metas');

    btnPersonalizarMetas.addEventListener('click', function() {
        modalMetas.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modalMetas.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modalMetas) {
            modalMetas.style.display = 'none';
        }
    });

    formMetas.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la recarga de la página
        // Aquí puedes agregar la lógica para guardar las nuevas metas
        const nuevoLimite = document.getElementById('limite-mensual').value;
        const recibirNotificaciones = document.getElementById('notificaciones').checked;

        console.log('Nuevo límite:', nuevoLimite);
        console.log('Recibir notificaciones:', recibirNotificaciones);

        // Cierra el modal después de "guardar"
        modalMetas.style.display = 'none';

        // Opcional: Puedes actualizar la información mostrada en la página
        const limiteMensualSpan = document.querySelector('.configuracion-metas p span');
        if (limiteMensualSpan) {
            limiteMensualSpan.textContent = nuevoLimite + ' L';
            // Aquí también podrías actualizar la barra de progreso si es necesario
        }

        alert('Metas guardadas!'); // Mensaje de confirmación (puedes personalizarlo)
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const configuracionBtn = document.querySelector('.configuracion-btn');
    const configuracionMenu = document.getElementById('configuracion-menu');

    configuracionBtn.addEventListener('click', function() {
        configuracionMenu.classList.toggle('show');
    });

    // Cierra el menú si el usuario hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.configuracion-btn') && !event.target.matches('.dropdown-menu') && !configuracionBtn.contains(event.target)) {
            if (configuracionMenu.classList.contains('show')) {
                configuracionMenu.classList.remove('show');
            }
        }
    });
});
