document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el contenedor específico para el fondo topo
    const topoContainer = document.getElementById('topo-background');
    const canvas = document.createElement("canvas");
    topoContainer.appendChild(canvas);

    // Ajuste dinámico del tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white"; // Color de las líneas del fondo animado

    var Input = {
        keys: [],
        mouse: {
            left: false,
            right: false,
            middle: false,
            x: 0,
            y: 0
        }
    };

    // Inicializar input para teclas y mouse
    for (var i = 0; i < 230; i++) {
        Input.keys.push(false);
    }
    document.addEventListener("keydown", function(event) {
        Input.keys[event.keyCode] = true;
    });
    document.addEventListener("keyup", function(event) {
        Input.keys[event.keyCode] = false;
    });
    document.addEventListener("mousedown", function(event) {
        if (event.button === 0) Input.mouse.left = true;
        if (event.button === 1) Input.mouse.middle = true;
        if (event.button === 2) Input.mouse.right = true;
    });
    document.addEventListener("mouseup", function(event) {
        if (event.button === 0) Input.mouse.left = false;
        if (event.button === 1) Input.mouse.middle = false;
        if (event.button === 2) Input.mouse.right = false;
    });
    document.addEventListener("mousemove", function(event) {
        Input.mouse.x = event.clientX;
        Input.mouse.y = event.clientY;
    });

    // Clases y lógica de la animación (Segment, LimbSystem, Creature, etc.)
    class Segment {
        // Clase Segment sin cambios, utilizando ctx como contexto
    }
    class LimbSystem {
        // Clase LimbSystem sin cambios, utilizando ctx como contexto
    }
    class LegSystem extends LimbSystem {
        // Clase LegSystem sin cambios
    }
    class Creature {
        // Clase Creature sin cambios, utilizando ctx como contexto
    }

    // Función para crear y animar la criatura
    function setupLizard(size, legs, tail) {
        var s = size;
        var critter = new Creature(
            window.innerWidth / 2,
            window.innerHeight / 2,
            0,
            s * 10,
            s * 2,
            0.5,
            16,
            0.5,
            0.085,
            0.5,
            0.3
        );
        var spinal = critter;
        
        // Configuración de cuello, torso, piernas y cola
        // Sin cambios en esta lógica

        // Llamada para dibujar y seguir el ratón
        setInterval(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            critter.follow(Input.mouse.x, Input.mouse.y);
        }, 33);
    }

    // Iniciar la animación con el setup deseado
    var legNum = Math.floor(1 + Math.random() * 12);
    setupLizard(
        8 / Math.sqrt(legNum),
        legNum,
        Math.floor(4 + Math.random() * legNum * 8)
    );
});
