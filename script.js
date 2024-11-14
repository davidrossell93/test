document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById("autoplayAudio");
    const profileImage = document.getElementById('profileImage');
    const fullScreenContainer = document.getElementById('fullScreenContainer');

    const tryAutoPlay = () => {
        audio.play().then(() => {
            console.log('Reproducción automática exitosa');
            removeInteractionEvents(); 
        }).catch(error => {
            console.log('Reproducción automática bloqueada', error);
        });
    };

    const addInteractionEvents = () => {
        document.addEventListener('click', tryAutoPlay);
        document.addEventListener('touchstart', tryAutoPlay);
    };

    const removeInteractionEvents = () => {
        document.removeEventListener('click', tryAutoPlay);
        document.removeEventListener('touchstart', tryAutoPlay);
    };

    addInteractionEvents();

    profileImage.addEventListener('click', () => {
        fullScreenContainer.style.display = 'flex';
        initFullScreenParticles();
    });

    fullScreenContainer.addEventListener('click', () => {
        fullScreenContainer.style.display = 'none';
    });

    // Configuración de partículas con un toque rojo oscuro
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 700 } },
            color: { value: ["#333333", "#555555", "#8b0000", "#191919"] }, // Toque de rojo oscuro en las partículas
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#8b0000", opacity: 0.5, width: 1 }, // Rojo oscuro en las líneas
            move: { enable: true, speed: 1.5, random: true }
        },
        interactivity: {
            detect_on: 'window',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    function initFullScreenParticles() {
        particlesJS('particles-fullscreen', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 700 } },
                color: { value: ["#333333", "#555555", "#8b0000", "#191919"] }, // Toque de rojo oscuro en partículas ampliadas
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: "#8b0000", opacity: 0.5, width: 1 }, // Rojo oscuro en las líneas
                move: { enable: true, speed: 1.5, random: true }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            }
        });
    }

    // Colores para el fondo en tonos de gris oscuro
    let colors = [
        [25, 25, 25],        // Gris oscuro
        [50, 50, 50],        // Gris medio oscuro
        [10, 10, 10]         // Gris muy oscuro casi negro
    ];
    let currentIndex = 0;
    const stepsToGray = 25;

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
        const steps = stepsToGray;

        const interval = setInterval(() => {
            const color = interpolateColor(colors[currentIndex], colors[nextIndex], step / steps);
            document.body.style.backgroundColor = color;
            fullScreenContainer.style.backgroundColor = color;
            step++;

            if (step > steps) {
                clearInterval(interval);
                currentIndex = nextIndex;
                setTimeout(changeBackgroundColor, 2000);
            }
        }, 50);
    }

    setTimeout(changeBackgroundColor, 2000);
});
