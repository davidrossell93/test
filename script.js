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

    // Configuración de partículas para el fondo principal con interactividad
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
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' }, // Partículas repelen al acercar el cursor
                onclick: { enable: true, mode: 'push' }, // Añade partículas al hacer clic
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 }, // Personaliza el efecto de repulsión
                push: { particles_nb: 4 } // Número de partículas añadidas en clic
            }
        },
        retina_detect: true
    });

    // Inicializa partículas interactivas para la imagen ampliada
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
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' }, // Partículas repelen al acercar el cursor
                    onclick: { enable: true, mode: 'push' }, // Añade partículas al hacer clic
                    resize: true
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 }, // Personaliza el efecto de repulsión
                    push: { particles_nb: 4 } // Número de partículas añadidas en clic
                }
            },
            retina_detect: true
        });
    }
});
