let ultimoEnvio = localStorage.getItem('ultimoEnvio') || 0;
const tiempoEspera = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

function generarCodigo() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const instagram = document.getElementById('instagram').value;

    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const fechaValidez = new Date();
    fechaValidez.setDate(fechaValidez.getDate() + 1);
    const horas = fechaValidez.getHours();
    const minutos = fechaValidez.getMinutes();
    const segundos = fechaValidez.getSeconds();
    

    if (nombre === '' || dni === '' || fechaNacimiento === '' || instagram === '') {
        alert('Todos los campos son obligatorios. Por favor, completa todos los campos.');
        return;
    }

    const nombreValido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(nombre);

    if (!nombreValido) {
        alert('El nombre no puede contener números ni caracteres especiales.');
        return;
    }

    if (edad < 18 || edad > 100) {
        alert('Debes tener entre 18 y 100 años para generar un cupón.');
        return;
    }

    // Validar el intervalo de tiempo para el envío del formulario
    const ahora = new Date().getTime();
    if (ahora - ultimoEnvio < tiempoEspera) {
        alert('Debes esperar 24 horas antes de volver a generar un cupón.');
        return;
    }

    // Validar el número de DNI
    if (!/^\d{7,8}$/.test(dni)) {
        alert('El número de DNI debe ser un número y tener entre 7 y 8 dígitos.');
        return;
    }

    // Generar código aleatorio (puedes personalizar según tus necesidades)
    const codigoAleatorio = Math.floor(Math.random() * 1000000) + 1;
    
    const cuponInfo = {
        nombre,
        dni,
        fechaNacimiento,
        instagram,
        fechaValidez: fechaValidez.toLocaleDateString() + ' ' + horas + ':' + minutos + ':' + segundos,
        codigoAleatorio
    };
    localStorage.setItem('cuponInfo', JSON.stringify(cuponInfo));

    const mensaje = `<p><strong>Nombre:</strong> ${nombre}</p>
                     <p><strong>DNI:</strong> ${dni}</p>
                     <p><strong>Válido hasta:</strong> ${fechaValidez.toLocaleDateString()} ${horas}:${minutos}:${segundos}</p>
                     <p><strong>Usuario de Instagram:</strong> ${instagram}</p>
                     <p><strong>Tu Código:</strong> ${codigoAleatorio}</p>
                     <p>Presentá este código en el local para obtener el descuento. No podrás generar un nuevo código por 24hs</p>`;
    
    document.getElementById('formulario').style.display = 'none';
    const resultadoContenido = document.getElementById('resultadoContenido');
    resultadoContenido.innerHTML = mensaje;
                 
    const nuevoTextoH1 = "¡Cupón Generado!";
    document.getElementById('tituloGenerador').innerText = nuevoTextoH1;

    // Mostrar el div de resultado y el botón de descarga
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.style.display = 'block';
    document.getElementById('descargarBtn').style.display = 'block';

    localStorage.setItem('ultimoEnvio', ahora);
}

function mostrarResultadoAlCargar() {
    const cuponInfo = JSON.parse(localStorage.getItem('cuponInfo'));

    if (cuponInfo) {
        const mensaje = `<p><strong>Nombre:</strong> ${cuponInfo.nombre}</p>
                         <p><strong>DNI:</strong> ${cuponInfo.dni}</p>
                         <p><strong>Válido hasta:</strong> ${cuponInfo.fechaValidez}</p>
                         <p><strong>Usuario de Instagram:</strong> ${cuponInfo.instagram}</p>
                         <p><strong>Tu Código:</strong> ${cuponInfo.codigoAleatorio}</p>`;

        // Ocultar el formulario y mostrar el resultado
        document.getElementById('formulario').style.display = 'none';
        const resultadoContenido = document.getElementById('resultadoContenido');
        resultadoContenido.innerHTML = mensaje;

        const nuevoTextoH1 = "¡Cupón Generado!";
        document.getElementById('tituloGenerador').innerText = nuevoTextoH1;

        // Mostrar el div de resultado y el botón de descarga
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.style.display = 'block';
        document.getElementById('descargarBtn').style.display = 'block';

        // Desactivar campos del formulario
        document.getElementById('nombre').disabled = true;
        document.getElementById('dni').disabled = true;
        document.getElementById('fechaNacimiento').disabled = true;
        document.getElementById('instagram').disabled = true;

        // Ocultar botón de generación del cupón
        document.getElementById('generarCodigoBtn').style.display = 'none';
    }
}

// Mostrar el resultado al cargar la página
mostrarResultadoAlCargar();

function descargarCupon() {
    // Obtener el elemento de resultado
    const resultadoElement = document.getElementById('resultadoContenido');

    // Esperar 500 milisegundos (ajusta el tiempo según sea necesario)
    setTimeout(() => {
        // Utilizar html2canvas para convertir el contenido en una imagen
        html2canvas(resultadoElement, { useCORS: true }).then(canvas => {
            // Convertir el canvas a blob
            canvas.toBlob(blob => {
                // Crear un enlace para descargar el archivo
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'cupon.jpg';
                link.click();
            });
        });
    }, 1000); // Retraso de 1000 milisegundos
}

document.getElementById('generarCodigoBtn').addEventListener('click', generarCodigo);
document.getElementById('descargarBtn').addEventListener('click', descargarCupon);