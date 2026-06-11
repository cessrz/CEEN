document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inicializamos Lottie desactivando el autoplay (Ruta relativa corregida)
    var animation = lottie.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './js/data46.json', 
        rendererSettings: {
            // 'slice' actúa como un background-size: cover impecable
            preserveAspectRatio: 'xMidYMid slice',
            className: 'lottie-svg-canvas'
        }
    });

    // 2. Controlamos la aparición del botón final AQUÍ ADENTRO para evitar errores de Scope
    animation.addEventListener('enterFrame', function () {
        var botonFinal = document.getElementById('btn-final');
        
        // Verificamos primero si el botón existe en el HTML para evitar errores en la consola
        if (botonFinal) {
            // Si faltan 2 cuadros o menos para terminar toda la animación vectorial:
            if (animation.currentFrame >= animation.totalFrames -100) { 
                botonFinal.classList.remove('oculto');
                botonFinal.classList.add('visible');
            } else {
                // Si el usuario regresa el scroll hacia arriba, se vuelve a ocultar progresivamente
                botonFinal.classList.remove('visible');
                botonFinal.classList.add('oculto');
            }
        }
    });

    // 3. Esperamos a que la animación termine de cargarse por completo
    animation.addEventListener('DOMLoaded', function () {
        console.log("Animación lista. Espacio de control extendido a 8 pantallas.");

        window.addEventListener('scroll', function () {
            // Posición actual del scroll del usuario
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // Medimos el alto de la ventana del usuario (1vh)
            var windowHeight = window.innerHeight;
            
            // Distancia exacta de control (8 veces la pantalla)
            var maxScroll = windowHeight * 7; 

            // Obtenemos el porcentaje de progreso clampeado entre 0 y 1
            var scrollPercent = scrollTop / maxScroll;
            if (scrollPercent > 1) scrollPercent = 1;
            if (scrollPercent < 0) scrollPercent = 0;

            // Mapeamos el porcentaje con los frames totales de After Effects
            var targetFrame = scrollPercent * (animation.totalFrames - 1);

            // Enviamos el cuadro exacto a la GPU mediante Lottie de forma instantánea
            animation.goToAndStop(targetFrame, true);
        });
    });
});