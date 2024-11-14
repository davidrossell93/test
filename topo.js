document.addEventListener("DOMContentLoaded", function() {
    const topoContainer = document.getElementById('topo-background');
    const canvas = document.createElement("canvas");
    topoContainer.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    class Segment {
        constructor(parent, size, angle) {
            this.parent = parent;
            this.size = size;
            this.angle = angle;
            this.x = parent ? parent.x + Math.cos(angle) * size : canvas.width / 2;
            this.y = parent ? parent.y + Math.sin(angle) * size : canvas.height / 2;
        }

        update() {
            if (this.parent) {
                const dx = this.x - Input.mouse.x;
                const dy = this.y - Input.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = (dist - this.size) / dist * 0.1;
                this.x -= dx * force;
                this.y -= dy * force;
            }
        }

        draw() {
            if (this.parent) {
                ctx.beginPath();
                ctx.moveTo(this.parent.x, this.parent.y);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();
            }
        }
    }

    const Input = { mouse: { x: 0, y: 0 } };
    document.addEventListener("mousemove", function(event) {
        Input.mouse.x = event.clientX;
        Input.mouse.y = event.clientY;
    });

    const segments = [new Segment(null, 50, Math.PI / 2)];
    for (let i = 1; i < 20; i++) {
        segments.push(new Segment(segments[i - 1], 50, Math.PI / 2));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let segment of segments) {
            segment.update();
            segment.draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
});
