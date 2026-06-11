document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inicializamos Lottie desactivando el autoplay
var animation = lottie.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './data45.json', 
    rendererSettings: {
        // 'slice' expande el SVG eliminando bordes laterales, actuando como un background-size: cover
        preserveAspectRatio: 'xMidYMid slice',
        className: 'lottie-svg-canvas'
    }
});
    // 2. Esperamos a que la animación termine de cargar
    animation.addEventListener('DOMLoaded', function () {
        console.log("Animación lista. Espacio de control extendido a 8 pantallas.");

        window.addEventListener('scroll', function () {
            
            // Posición actual del scroll del usuario
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // Medimos cuánto mide la ventana actual del usuario en píxeles (1vh)
            var windowHeight = window.innerHeight;
            
            // Definimos la distancia exacta de control (8 veces la pantalla del usuario)
            // Restamos 1 pantalla porque el scroll inicia en la primera (pantalla 0)
            var maxScroll = windowHeight * 7; 

            // Obtenemos el porcentaje de progreso (Clampeado entre 0 y 1 para evitar errores si sobrepasa)
            var scrollPercent = scrollTop / maxScroll;
            if (scrollPercent > 1) scrollPercent = 1;
            if (scrollPercent < 0) scrollPercent = 0;

            // Mapeamos el porcentaje con los frames totales de After Effects
            var targetFrame = scrollPercent * (animation.totalFrames - 1);

            // Enviamos el cuadro exacto a la GPU mediante Lottie
            animation.goToAndStop(targetFrame, true);
        });
    });
});
