// PROJECT 03 — PARTICLE PLAYGROUND
// Interactive particle system with attraction, repulsion,
// bouncing boundaries and speed-based brightness.

const particles = [];

const PARTICLE_COUNT = 20;
const FORCE = 0.05;
const MAX_SPEED = 5;

function setup() {
  createCanvas(500, 500);
  noStroke();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2),
      size: random(5, 20),
    });
  }
}

function draw() {
  background(20, 20, 30, 35);

  for (const particle of particles) {
    applyMouseForce(particle);

    const speed = limitSpeed(particle);

    particle.x += particle.vx;
    particle.y += particle.vy;

    checkBoundaries(particle);
    drawParticle(particle, speed);
  }

  drawInstructions();
}

function applyMouseForce(particle) {
  const dx = mouseX - particle.x;
  const dy = mouseY - particle.y;

  const distance = dist(
    particle.x,
    particle.y,
    mouseX,
    mouseY
  );

  if (distance === 0) {
    return;
  }

  const directionX = dx / distance;
  const directionY = dy / distance;

  const force = mouseIsPressed ? -FORCE : FORCE;

  particle.vx += directionX * force;
  particle.vy += directionY * force;
}

function limitSpeed(particle) {
  let speed = dist(
    0,
    0,
    particle.vx,
    particle.vy
  );

  if (speed > MAX_SPEED) {
    particle.vx =
      (particle.vx / speed) * MAX_SPEED;

    particle.vy =
      (particle.vy / speed) * MAX_SPEED;

    speed = MAX_SPEED;
  }

  return speed;
}

function checkBoundaries(particle) {
  const radius = particle.size / 2;

  if (particle.x - radius < 0) {
    particle.x = radius;
    particle.vx *= -1;
  }

  if (particle.x + radius > width) {
    particle.x = width - radius;
    particle.vx *= -1;
  }

  if (particle.y - radius < 0) {
    particle.y = radius;
    particle.vy *= -1;
  }

  if (particle.y + radius > height) {
    particle.y = height - radius;
    particle.vy *= -1;
  }
}

function drawParticle(particle, speed) {
  let brightness = map(
    speed,
    0,
    MAX_SPEED,
    80,
    255
  );

  if (mouseIsPressed) {
    brightness = min(brightness + 40, 255);
  }

  fill(brightness);

  ellipse(
    particle.x,
    particle.y,
    particle.size,
    particle.size
  );
}

function drawInstructions() {
  push();

  fill(180);
  noStroke();
  textAlign(CENTER);
  textSize(12);

  text(
    "MOVE TO ATTRACT • HOLD MOUSE TO REPEL",
    width / 2,
    height - 20
  );

  pop();
}
