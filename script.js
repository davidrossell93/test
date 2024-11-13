document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById("autoplayAudio");
    const profileImage = document.getElementById('profileImage');
    const fullScreenContainer = document.getElementById('fullScreenContainer');

    // Intentar reproducir el audio automáticamente
    const tryAutoPlay = () => {
        audio.play().then(() => {
            console.log('Reproducción automática exitosa');
            removeInteractionEvents(); 
        }).catch(error => {
            console.log('Reproducción automática bloqueada', error);
        });
    };

    // Añadir eventos de interacción para activar el audio en móviles
    const addInteractionEvents = () => {
        document.addEventListener('click', tryAutoPlay);
        document.addEventListener('touchstart', tryAutoPlay);
    };

    const removeInteractionEvents = () => {
        document.removeEventListener('click', tryAutoPlay);
        document.removeEventListener('touchstart', tryAutoPlay);
    };

    addInteractionEvents();

    // Muestra la imagen ampliada al hacer clic en la imagen de perfil
    profileImage.addEventListener('click', () => {
        fullScreenContainer.style.display = 'flex'; // Muestra el contenedor de pantalla completa
        initFullScreenParticles(); // Inicia partículas para el fondo ampliado
    });

    // Oculta la imagen ampliada al hacer clic en cualquier parte del contenedor
    fullScreenContainer.addEventListener('click', () => {
        fullScreenContainer.style.display = 'none'; // Oculta el contenedor de pantalla completa
        particlesJS("particles-fullscreen", {}); // Reinicia las partículas para pantalla completa
    });

    // Configuración de partículas para el fondo principal
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 700 } },
            color: { value: ["#000000", "#6a0dad"] }, // Negro y violeta
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#6a0dad", opacity: 0.6, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: "out", attract: { enable: false } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true }
        },
        retina_detect: true
    });

    // Inicializa partículas para la imagen ampliada
    function initFullScreenParticles() {
        particlesJS('particles-fullscreen', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 700 } },
                color: { value: ["#000000", "#6a0dad"] },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: "#6a0dad", opacity: 0.6, width: 1 },
                move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: "out", attract: { enable: false } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true }
            },
            retina_detect: true
        });
    }

    // Cambia el fondo de forma gradual entre negro y violeta
    let colors = [
        [0, 0, 0],          // Negro
        [75, 0, 130]       // Violeta suave (#4B0082)
    ];
    let currentIndex = 0;
    const stepsToViolet = 25;  // Número de pasos para cambiar a violeta (rápido)
    const stepsToBlack = 300;   // Número de pasos para volver a negro (lento)

    function interpolateColor(colorA, colorB, factor) {
        const result = colorA.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (colorB[i] - colorA[i]));
        }
        return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    }

    function changeBackgroundColor() {
        let step = 0;
        const nextIndex = (currentIndex + 1) % colors.length;
        const steps = currentIndex === 0 ? stepsToViolet : stepsToBlack;

        const interval = setInterval(() => {
            const color = interpolateColor(colors[currentIndex], colors[nextIndex], step / steps);
            document.body.style.backgroundColor = color;
            step++;

            if (step > steps) {
                clearInterval(interval);
                currentIndex = nextIndex;
                const delay = currentIndex === 0 ? 7000 : 500;
                setTimeout(changeBackgroundColor, delay);
            }
        }, 50);
    }

    // Iniciar el cambio de color de fondo después de 2 segundos
    setTimeout(changeBackgroundColor, 2000);
});
