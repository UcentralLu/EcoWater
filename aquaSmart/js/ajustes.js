document.addEventListener('DOMContentLoaded', function() {
    const btnCambiarContrasena = document.querySelector('.btn-cambiar-contrasena');
    const cambiarContrasenaForm = document.getElementById('cambiar-contrasena-form');
    const btnCancelarContrasena = document.querySelector('.btn-cancelar-contrasena');
    const btnGuardarAjustes = document.querySelector('.btn-guardar-ajustes');

    if (btnCambiarContrasena) {
        btnCambiarContrasena.addEventListener('click', function() {
            cambiarContrasenaForm.style.display = 'flex';
        });
    }

    if (btnCancelarContrasena) {
        btnCancelarContrasena.addEventListener('click', function() {
            cambiarContrasenaForm.style.display = 'none';
        });
    }

    if (btnGuardarAjustes) {
        btnGuardarAjustes.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para guardar los ajustes
            const nombreUsuario = document.getElementById('nombre-usuario').value;
            const email = document.getElementById('email').value;
            const nuevaContrasena = document.getElementById('nueva-contrasena').value;
            const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
            const unidadConsumo = document.getElementById('unidad-consumo').value;
            const frecuenciaReportes = document.getElementById('frecuencia-reportes').value;
            const notificacionesAlertas = document.getElementById('notificaciones-alertas').checked;
            const temaApp = document.getElementById('tema-app').value;

            console.log('Nombre de Usuario:', nombreUsuario);
            console.log('Email:', email);
            console.log('Nueva Contraseña:', nuevaContrasena);
            console.log('Confirmar Contraseña:', confirmarContrasena);
            console.log('Unidad de Consumo:', unidadConsumo);
            console.log('Frecuencia de Reportes:', frecuenciaReportes);
            console.log('Notificaciones de Alertas:', notificacionesAlertas);
            console.log('Tema de la App:', temaApp);

            alert('Ajustes guardados!'); // Mensaje de confirmación
            // Aquí podrías enviar los datos al servidor o actualizar el estado de la aplicación
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const botonesEditar = document.querySelectorAll('.btn-editar');
    const botonesGuardar = document.querySelectorAll('.btn-guardar');
    const botonesCancelar = document.querySelectorAll('.btn-cancelar');
    const btnCambiarAvatar = document.querySelector('.btn-cambiar-avatar');
    const uploadAvatarInput = document.getElementById('upload-avatar');
    const avatarImage = document.querySelector('.avatar img');

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function() {
            const campo = this.dataset.campo;
            const span = document.getElementById(`${campo}-perfil`);
            const input = document.getElementById(`editar-${campo}`);

            if (span && input) {
                span.style.display = 'none';
                input.style.display = 'inline-block';
                this.style.display = 'none';
                const botonGuardar = document.querySelector(`.btn-guardar[data-campo="${campo}"]`);
                const botonCancelar = document.querySelector(`.btn-cancelar[data-campo="${campo}"]`);
                if (botonGuardar && botonCancelar) {
                    botonGuardar.style.display = 'inline-block';
                    botonCancelar.style.display = 'inline-block';
                }
                if (input.tagName === 'INPUT') {
                    input.value = span.textContent;
                    input.focus();
                } else if (input.tagName === 'SELECT') {
                    input.value = span.textContent.split(' ')[0].toLowerCase(); // Intenta seleccionar la opción
                }
            }
        });
    });

    botonesCancelar.forEach(boton => {
        boton.addEventListener('click', function() {
            const campo = this.dataset.campo;
            const span = document.getElementById(`${campo}-perfil`);
            const input = document.getElementById(`editar-${campo}`);
            span.style.display = 'inline-block';
            input.style.display = 'none';
            this.style.display = 'none';
            const botonEditar = document.querySelector(`.btn-editar[data-campo="${campo}"]`);
            if (botonEditar) {
                botonEditar.style.display = 'inline-block';
            }
            const botonGuardar = document.querySelector(`.btn-guardar[data-campo="${campo}"]`);
            if (botonGuardar) {
                botonGuardar.style.display = 'none';
            }
        });
    });

    botonesGuardar.forEach(boton => {
        boton.addEventListener('click', function() {
            const campo = this.dataset.campo;
            const span = document.getElementById(`${campo}-perfil`);
            const input = document.getElementById(`editar-${campo}`);

            if (span && input) {
                let nuevoValor = '';
                if (input.tagName === 'INPUT') {
                    nuevoValor = input.value;
                } else if (input.tagName === 'SELECT') {
                    nuevoValor = input.options[input.selectedIndex].text;
                }
                span.textContent = nuevoValor;
                span.style.display = 'inline-block';
                input.style.display = 'none';
                this.style.display = 'none';
                const botonEditar = document.querySelector(`.btn-editar[data-campo="${campo}"]`);
                const botonCancelar = document.querySelector(`.btn-cancelar[data-campo="${campo}"]`);
                if (botonEditar) {
                    botonEditar.style.display = 'inline-block';
                }
                if (botonCancelar) {
                    botonCancelar.style.display = 'none';
                }
                // Aquí podrías enviar el nuevo valor al servidor para guardar
                console.log(`Guardando ${campo}: ${nuevoValor}`);
            }
        });
    });

    if (btnCambiarAvatar && uploadAvatarInput && avatarImage) {
        btnCambiarAvatar.addEventListener('click', () => {
            uploadAvatarInput.click();
        });

        uploadAvatarInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarImage.src = e.target.result;
                    // Aquí podrías enviar la imagen al servidor para guardar
                    console.log('Avatar cambiado');
                };
                reader.readAsDataURL(file);
            }
        });
    }
});