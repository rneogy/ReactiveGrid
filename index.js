const container = document.querySelector("#container");
const width = window.innerWidth;
const height = window.innerHeight;
const gridSpacing = 50;
const r = 10;
const minRadius = 2;
const kernelSize = 5;
const kernelDist2 = kernelSize * kernelSize * gridSpacing * gridSpacing;

const circles = [];

for (let x = 0; x < width; x += gridSpacing) {
  const col = [];
  for (let y = 0; y < height; y += gridSpacing) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("_x", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("_y", y);
    circle.setAttribute("r", 0);
    container.appendChild(circle);
    col.push(circle);
  }
  circles.push(col);
}

let lastTime = new Date().getTime();
const fps = 60;
const dt = 1000 / fps;

container.addEventListener("mousemove", e => {
  const curTime = new Date().getTime();
  if (curTime - lastTime < dt) {
    return;
  }
  lastTime = curTime;
  const x = e.clientX;
  const y = e.clientY;
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles[0].length; j++) {
      const circle = circles[i][j];
      const cx = +circle.getAttribute("_x");
      const cy = +circle.getAttribute("_y");
      const dx = x - cx;
      const dy = y - cy;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < kernelDist2) {
        circle.setAttribute("r", Math.max(minRadius, (1 - dist2 / kernelDist2) * r));
        circle.setAttribute("cx", cx + dx / gridSpacing);
        circle.setAttribute("cy", cy + dy / gridSpacing);
      } else {
        circle.setAttribute("r", minRadius);
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
      }
    }
  }
});
