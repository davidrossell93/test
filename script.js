
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById("autoplayAudio");

    // Función para intentar reproducir el audio
    const tryAutoPlay = () => {
        audio.play().then(() => {
            console.log('Reproducción automática exitosa');
            removeInteractionEvents(); 
        }).catch(error => {
            console.log('Reproducción automática bloqueada', error);
        });
    };

    // Eventos de interacción
    const addInteractionEvents = () => {
        document.addEventListener('click', tryAutoPlay);
        document.addEventListener('touchstart', tryAutoPlay);
    };

    const removeInteractionEvents = () => {
        document.removeEventListener('click', tryAutoPlay);
        document.removeEventListener('touchstart', tryAutoPlay);
    };

    addInteractionEvents();

    // Manejo de la imagen ampliada
    const profileImage = document.getElementById('profileImage');
    const fullScreenContainer = document.getElementById('fullScreenContainer');

    // Muestra la imagen ampliada al hacer clic en la imagen de perfil
    profileImage.addEventListener('click', () => {
        fullScreenContainer.style.display = 'flex'; 
        playClickSound(); 
        initFullScreenParticles();
    });

    function playClickSound() {
        const clickSound = new Audio(''); // Agrega una URL si deseas un sonido al ampliar la imagen
        clickSound.play();
    }

    // Oculta la imagen ampliada al hacer clic en cualquier lugar del contenedor
    fullScreenContainer.addEventListener('click', () => {
        fullScreenContainer.style.display = 'none';
    });

    // Configuración de partículas para el fondo principal
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 700 } },
            color: {
                value: ["#000000", "#6a0dad"], // Negro y violeta
            },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000000' }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 3, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6a0dad", // Color violeta para los enlaces
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: "out",
                attract: { enable: false }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Inicializa partículas para la imagen ampliada con los mismos colores
    function initFullScreenParticles() {
        particlesJS('particles-fullscreen', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 700 } },
                color: {
                    value: ["#000000", "#6a0dad"], // Negro y violeta
                },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 3, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6a0dad", // Color violeta para los enlaces
                    opacity: 0.6,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: "out",
                    attract: { enable: false }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Cambiar el fondo de forma gradual entre negro y un violeta sutil
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
        const steps = currentIndex === 0 ? stepsToViolet : stepsToBlack;  // Cambiar de negro a violeta muy rápido

        const interval = setInterval(() => {
            const color = interpolateColor(colors[currentIndex], colors[nextIndex], step / steps);
            document.body.style.backgroundColor = color;
            step++;

            if (step > steps) {
                clearInterval(interval);
                currentIndex = nextIndex;
                const delay = currentIndex === 0 ? 7000 : 500; // Mucho tiempo en negro, muy poco en violeta
                setTimeout(changeBackgroundColor, delay);
            }
        }, 50);
    }

    // Iniciar el cambio de color de fondo después de 2 segundos
    setTimeout(changeBackgroundColor, 2000);
});
