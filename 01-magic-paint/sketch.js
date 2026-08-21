// PROJECT 01 — MAGIC PAINT
// Interactive generative drawing with mouse movement, randomness,
// shape modes, trail effects and speed-based color.

let trail = false;
let shapeMode = 1;

const BG_COLOR = [20, 20, 30];
const DEFAULT_JITTER = 15;
const EXPLOSION_JITTER = 80;

function setup() {
  createCanvas(500, 500);

  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();

  clearCanvas();

  describe(
    "Interactive generative painting with randomized shapes, movement and color."
  );
}

function draw() {
  applyTrail();

  const size = getBrushSize();
  const jitterAmount = getJitterAmount();
  const position = getBrushPosition(jitterAmount);

  setBrushColor();
  drawBrush(position.x, position.y, size);
}

function applyTrail() {
  if (trail) {
    background(...BG_COLOR, 8);
  }
}

function getBrushSize() {
  const baseSize = map(mouseX, 0, width, 10, 60);
  return baseSize * random(0.5, 2);
}

function getJitterAmount() {
  return mouseIsPressed ? EXPLOSION_JITTER : DEFAULT_JITTER;
}

function getBrushPosition(jitterAmount) {
  return {
    x: mouseX + random(-jitterAmount, jitterAmount),
    y: mouseY + random(-jitterAmount, jitterAmount),
  };
}

function setBrushColor() {
  const r = map(mouseX, 0, width, 0, 255);
  const g = map(mouseY, 0, height, 0, 255);

  const mouseSpeed = dist(pmouseX, pmouseY, mouseX, mouseY);
  const b = map(mouseSpeed, 0, 50, 30, 255, true);

  fill(r, g, b);
}

function drawBrush(x, y, size) {
  push();

  translate(x, y);
  rotate(random(0, 360));

  drawShape(size);

  pop();
}

function drawShape(size) {
  if (shapeMode === 1) {
    rect(0, 0, size, size);
  } else if (shapeMode === 2) {
    ellipse(0, 0, size, size);
  } else if (shapeMode === 3) {
    triangle(
      0,
      -size / 2,
      -size / 2,
      size / 2,
      size / 2,
      size / 2
    );
  }
}

function keyPressed() {
  if (key === "t" || key === "T") {
    trail = !trail;
  }

  if (key === "1") {
    shapeMode = 1;
  } else if (key === "2") {
    shapeMode = 2;
  } else if (key === "3") {
    shapeMode = 3;
  }

  if (key === "c" || key === "C") {
    clearCanvas();
  }
}

function clearCanvas() {
  background(...BG_COLOR);
}
