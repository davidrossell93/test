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
    const closeButton = document.querySelector('.close-button');

    profileImage.addEventListener('click', () => {
        fullScreenContainer.style.display = 'flex'; 
        profileImage.classList.toggle('clicked');
        playClickSound(); 
        initFullScreenParticles();
    });

    function playClickSound() {
        const clickSound = new Audio('https://raw.githubusercontent.com/davidrossell93/xatspace/main/ampliada.mp3');
        clickSound.play();
    }

    closeButton.addEventListener('click', () => {
        fullScreenContainer.style.display = 'none'; 
        profileImage.classList.remove('clicked'); 
    });

    fullScreenContainer.addEventListener('click', (event) => {
        if (event.target === fullScreenContainer) { 
            fullScreenContainer.style.display = 'none'; 
            profileImage.classList.remove('clicked'); 
        }
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

    // Cambiar el fondo de forma cíclica
    let currentIndex = 0;
    let colors = [
        [10, 10, 10],     // Negro oscuro
        [55, 0, 0],       // Rojo oscuro
        [34, 34, 34],     // Gris oscuro
        [102, 0, 0],      // Burdeos profundo
        [30, 0, 0]        // Marrón muy oscuro
    ];

    function changeBackgroundColor() {
        const nextIndex = (currentIndex + 1) % colors.length;
        let step = 0;
        const steps = 100;

        const interval = setInterval(() => {
            const color = interpolateColor(colors[currentIndex], colors[nextIndex], step / steps);
            document.body.style.backgroundColor = color;
            step++;

            if (step > steps) {
                clearInterval(interval);
                currentIndex = nextIndex;
            }
        }, 20);
    }

    // Cambia el fondo cada 7 segundos
    setInterval(changeBackgroundColor, 7000);
});
