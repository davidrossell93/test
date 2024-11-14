document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el contenedor para `topo.js`
    const topoContainer = document.getElementById('topo-background');
    const canvas = document.createElement("canvas");
    topoContainer.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext("2d");

    // Declaración de Input y configuraciones iniciales
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

    // Código de las clases Segment, LimbSystem, LegSystem, Creature, etc.
    var segmentCount = 0;
    class Segment { /* ... */ }
    class LimbSystem { /* ... */ }
    class LegSystem extends LimbSystem { /* ... */ }
    class Creature { /* ... */ }

    // Inicializar el setup de topo.js
    function setupLizard(size, legs, tail) {
        var critter = new Creature(
            window.innerWidth / 2,
            window.innerHeight / 2,
            0,
            size * 10,
            size * 2,
            0.5,
            16,
            0.5,
            0.085,
            0.5,
            0.3
        );
        
        setInterval(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            critter.follow(Input.mouse.x, Input.mouse.y);
        }, 33);
    }

    var legNum = Math.floor(1 + Math.random() * 12);
    setupLizard(8 / Math.sqrt(legNum), legNum, Math.floor(4 + Math.random() * legNum * 8));
});
