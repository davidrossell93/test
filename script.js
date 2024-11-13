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
        fullScreenContainer.style.display = 'flex';
        initFullScreenParticles();
    });

    // Oculta la imagen ampliada al hacer clic en cualquier parte del contenedor
    fullScreenContainer.addEventListener('click', () => {
        fullScreenContainer.style.display = 'none';
    });

    // Configuración de partículas para el fondo principal
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 700 } },
            color: { value: ["#000000", "#6a0dad"] },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#6a0dad", opacity: 0.6, width: 1 },
            move: { enable: true, speed: 1.5, random: true }
        },
        interactivity: {
            detect_on: 'window', // Detecta interacciones en toda la ventana
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Inicializa partículas para la imagen ampliada con la misma configuración
    function initFullScreenParticles() {
        particlesJS('particles-fullscreen', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 700 } },
                color: { value: ["#000000", "#6a0dad"] },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: "#6a0dad", opacity: 0.6, width: 1 },
                move: { enable: true, speed: 1.5, random: true }
            },
            interactivity: {
                detect_on: 'canvas', // Detecta interacciones en el lienzo de la imagen ampliada
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            }
        });
    }

    // Cambiar el fondo de forma gradual entre negro y violeta en ambos contenedores
    let colors = [
        [0, 0, 0],         // Negro
        [75, 0, 130]       // Violeta suave (#4B0082)
    ];
    let currentIndex = 0;
    const stepsToViolet = 25;
    const stepsToBlack = 300;

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
            fullScreenContainer.style.backgroundColor = color;
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
