window.onload = () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const quads = [];
  const size = 10;
  const rows = 100;
  const cols = 20;
  const colors = ["black", "orange", "#0088FF"];

  context.translate(0, 0);

  const frame = function() {
    { quads.length && rander() }
    requestAnimationFrame(frame);
  }

  const init = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // add quads
    for (let i = 0; i < rows; i ++) {
      for (let j = 0; j < cols; j ++) {
        const quad = new Quad(100 + i * size, 100 + j * size, size, size);
        quads.push(quad);
      }
    }
  }

  const rander = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    quads.forEach(quad => {
      quad.draw();
    })
  }

  function Quad(x, y, width, height) {
    const velVector = {
      x: Math.random() * 10,
      y: Math.random() * 10
    };
    const targetPoint = {
      x: 300,
      y: 300
    };
    const speed = 0.5;
    let angle = 0;
    let colorIndex = 0;

    // constructor
    (function() {
      colorIndex = Math.round(Math.random() * colors.length);
      context.fillStyle = colors[colorIndex];
      context.fillRect(x, y, width, height);
      context.stroke();
    })()

    this.draw = function() {
      const dx = targetPoint.x - x;
      const dy = targetPoint.y - y;
      const alphaFactor = (canvas.height - y) * 0.002;

      angle = Math.atan2(dy, dx);
      velVector.x += Math.cos(angle);
      velVector.y += Math.sin(angle);
      x += velVector.x * speed;
      y += velVector.y * speed * dx / 10000;
      context.fillStyle =  colors[colorIndex];
      context.fillRect(x, y, width * alphaFactor, height * alphaFactor);
    }
  }

  init();
  frame();
}
