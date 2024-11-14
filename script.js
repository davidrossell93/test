// Configura el canvas para ocupar toda la pantalla
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Ajusta el tamaño del canvas al cargar la página y al redimensionar la ventana
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mantiene el fondo negro y sin desplazamiento en la página
document.body.style.backgroundColor = "black";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

// Aquí continúa tu código de animación con los segmentos, criaturas, etc.

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
  if (event.button === 0) {
    Input.mouse.left = true;
  }
  if (event.button === 1) {
    Input.mouse.middle = true;
  }
  if (event.button === 2) {
    Input.mouse.right = true;
  }
});
document.addEventListener("mouseup", function(event) {
  if (event.button === 0) {
    Input.mouse.left = false;
  }
  if (event.button === 1) {
    Input.mouse.middle = false;
  }
  if (event.button === 2) {
    Input.mouse.right = false;
  }
});
document.addEventListener("mousemove", function(event) {
  Input.mouse.x = event.clientX;
  Input.mouse.y = event.clientY;
});

// Clases y animación

var segmentCount = 0;
class Segment {
  constructor(parent, size, angle, range, stiffness) {
    segmentCount++;
    this.isSegment = true;
    this.parent = parent;
    if (typeof parent.children == "object") {
      parent.children.push(this);
    }
    this.children = [];
    this.size = size;
    this.relAngle = angle;
    this.defAngle = angle;
    this.absAngle = parent.absAngle + angle;
    this.range = range;
    this.stiffness = stiffness;
    this.updateRelative(false, true);
  }
  updateRelative(iter, flex) {
    this.relAngle =
      this.relAngle -
      2 * Math.PI * Math.floor((this.relAngle - this.defAngle) / (2 * Math.PI) + 1 / 2);
    if (flex) {
      this.relAngle = Math.min(
        this.defAngle + this.range / 2,
        Math.max(
          this.defAngle - this.range / 2,
          (this.relAngle - this.defAngle) / this.stiffness + this.defAngle
        )
      );
    }
    this.absAngle = this.parent.absAngle + this.relAngle;
    this.x = this.parent.x + Math.cos(this.absAngle) * this.size;
    this.y = this.parent.y + Math.sin(this.absAngle) * this.size;
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].updateRelative(iter, flex);
      }
    }
  }
  draw(iter) {
    ctx.beginPath();
    ctx.moveTo(this.parent.x, this.parent.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(true);
      }
    }
  }
  follow(iter) {
    var x = this.parent.x;
    var y = this.parent.y;
    var dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
    this.x = x + this.size * (this.x - x) / dist;
    this.y = y + this.size * (this.y - y) / dist;
    this.absAngle = Math.atan2(this.y - y, this.x - x);
    this.relAngle = this.absAngle - this.parent.absAngle;
    this.updateRelative(false, true);
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].follow(true);
      }
    }
  }
}

// Aquí puedes continuar con el resto de tus clases y el setup de la animación

// Ejemplo de inicialización
var legNum = Math.floor(1 + Math.random() * 12);
setupLizard(
  8 / Math.sqrt(legNum),
  legNum,
  Math.floor(4 + Math.random() * legNum * 8)
);
