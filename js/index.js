document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inicializamos Lottie de forma normal, pero desactivamos el autoplay
    var animation = lottie.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: false, // Importante: falso para que no se cicle sola
        autoplay: false, // Importante: falso para que dependa del scroll
        path: './js/data.json' // Asegúrate de cambiar esto por tu JSON real
    });

    // 2. Esperamos a que la animación termine de cargar su estructura interna
    animation.addEventListener('DOMLoaded', function () {
        console.log("Animación lista para el scroll.");

        // Escuchamos el evento de scroll en la ventana del navegador
        window.addEventListener('scroll', function () {
            
            // Calculamos cuánto ha bajado el usuario en total
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // Calculamos el máximo scroll posible de la página actual
            var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            // Obtenemos el porcentaje de scroll (un valor entre 0 y 1)
            var scrollPercent = scrollTop / maxScroll;

            // Calculamos el frame exacto mapeando el porcentaje con la duración de la animación
            // totalFrames nos da el total de cuadros que exportaste desde After Effects
            var targetFrame = scrollPercent * (animation.totalFrames - 1);

            // Le decimos a Lottie que vaya a ese frame exacto y se detenga ahí
            animation.goToAndStop(targetFrame, true);
        });
    });
});