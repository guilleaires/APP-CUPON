# Generador de Cupones de Descuento - Documentación

## Descripción

Este proyecto consiste en un generador de cupones de descuento para una cervecería. Los usuarios pueden completar un formulario con su información personal, y el sistema generará un cupón único que incluirá un código aleatorio. Los cupones tienen una validez de 24 horas.

## Uso

    Acceso a la Aplicación
        Abre el archivo index.html en tu navegador para acceder al generador de cupones.

    Formulario de Generación de Cupones
        Completa todos los campos obligatorios del formulario:
            Nombre: Ingresa tu nombre sin números ni caracteres especiales.
            Número de DNI: Ingresa un número de DNI válido de 7 a 8 dígitos.
            Fecha de Nacimiento: Selecciona tu fecha de nacimiento.
            Usuario de Instagram: Ingresa tu usuario de Instagram.
        Haz clic en el botón "Generar Código" para generar tu cupón.

    Resultado y Descarga
        Después de generar el código, se mostrará un resumen con tus datos y el código en la sección de resultados.
        Puedes hacer clic en el botón "Descargar Cupón" para obtener una imagen del cupón en formato JPG.

    Restricciones
        Debes tener al menos 18 años y no más de 100 años para generar un cupón.
        Solo puedes generar un cupón cada 24 horas.

## Funciones Principales

- generarCodigo()

Esta función se encarga de recopilar la información del formulario, validarla y generar un cupón de descuento. Algunas acciones realizadas por esta función incluyen:

    Obtener valores del formulario (nombre, DNI, fecha de nacimiento, usuario de Instagram).
    Validar la información ingresada en el formulario.
    Verificar el intervalo de tiempo para la generación del cupón.
    Generar un código aleatorio y almacenar la información del cupón en el almacenamiento local.
    Mostrar el resultado en la interfaz de usuario.

- mostrarResultadoAlCargar()

Esta función se ejecuta al cargar la página para mostrar el resultado almacenado localmente, en caso de que exista. Realiza las siguientes acciones:

    Recupera la información del cupón almacenada localmente.
    Muestra el resultado en la interfaz de usuario.
    Desactiva los campos del formulario y oculta el botón de generación del cupón.

- descargarCupon()

Esta función se encarga de tomar el contenido del resultado, convertirlo en una imagen mediante html2canvas, y permitir al usuario descargar la imagen generada como un archivo JPEG.

## Validaciones

    Nombre:
        No puede contener números ni caracteres especiales, solo letras y espacios.

    Número de DNI:
        Debe ser un número.
        Debe tener entre 7 y 8 dígitos.

    Edad:
        Debes tener entre 18 y 100 años para generar un cupón.

    Intervalo de Tiempo:
        Debes esperar 24 horas antes de volver a generar un cupón.

## Tecnologías Utilizadas

    HTML
    CSS
    JavaScript
    Bibliotecas:
        html2canvas: Para convertir el contenido HTML en una imagen.
        canvas-toBlob: Para convertir el lienzo de la imagen en un archivo blob.

## Autor

    [Guillermo Rodriguez Aires]
    [Enlace al Sitio Web de la Cervecería]
    [Contacto]
