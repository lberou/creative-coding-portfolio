// PROJECT 02 — WEIRD CREATURE
// Interactive creature generator with random traits
// and mouse-controlled facial reactions.

let creature;

const STROKE_COLOR = 30;
const STROKE_WEIGHT = 3;
const PUPIL_SIZE = 4;

function setup() {
  createCanvas(500, 500);
  randomizeCreature();
}

function draw() {
  background(220);

  const creatureX = width / 2;
  const creatureY = height / 2;

  drawBody(creatureX, creatureY);
  drawEyes(creatureX, creatureY);
  drawMouth(creatureX, creatureY);
  drawAntennas(creatureX, creatureY);
  drawInstructions();
}

function drawBody(x, y) {
  push();

  fill(creature.bodyR, creature.bodyG, creature.bodyB);
  stroke(STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);

  ellipse(x, y, creature.bodyWidth, creature.bodyHeight);

  pop();
}

function drawEyes(x, y) {
  push();

  const eyeSpacing = creature.bodyWidth * 0.22;

  const pupilX = map(mouseX, 0, width, -5, 5);
  const pupilY = map(mouseY, 0, height, -5, 5);

  stroke(STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);
  fill(255);

  ellipse(x - eyeSpacing, y - 30, creature.eyeSize, creature.eyeSize);
  ellipse(x + eyeSpacing, y - 30, creature.eyeSize, creature.eyeSize);

  noStroke();
  fill(20);

  ellipse(
    x - eyeSpacing + pupilX,
    y - 30 + pupilY,
    PUPIL_SIZE,
    PUPIL_SIZE
  );

  ellipse(
    x + eyeSpacing + pupilX,
    y - 30 + pupilY,
    PUPIL_SIZE,
    PUPIL_SIZE
  );

  pop();
}

function drawMouth(x, y) {
  push();

  const mouthHeight = map(mouseY, 0, height, 5, 60);

  fill(255);
  stroke(STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);

  ellipse(x, y + 35, creature.mouthWidth, mouthHeight);

  pop();
}

function drawAntennas(x, y) {
  push();

  const antennaOffsetX = creature.bodyWidth * 0.18;
  const antennaStartY = y - creature.bodyHeight * 0.47;
  const antennaSpread = creature.bodyWidth * 0.25;

  const antennaTipX = antennaOffsetX + antennaSpread;
  const antennaTipY = antennaStartY - creature.antennaLength;

  stroke(STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);
  fill(creature.bodyR, creature.bodyG, creature.bodyB);

  line(
    x - antennaOffsetX,
    antennaStartY,
    x - antennaTipX,
    antennaTipY
  );

  line(
    x + antennaOffsetX,
    antennaStartY,
    x + antennaTipX,
    antennaTipY
  );

  ellipse(
    x - antennaTipX,
    antennaTipY,
    creature.antennaTipSize,
    creature.antennaTipSize
  );

  ellipse(
    x + antennaTipX,
    antennaTipY,
    creature.antennaTipSize,
    creature.antennaTipSize
  );

  pop();
}

function drawInstructions() {
  push();

  fill(30);
  noStroke();
  textAlign(CENTER);
  textSize(14);

  text(
    "CLICK TO CREATE A NEW CREATURE",
    width / 2,
    height - 25
  );

  pop();
}

function randomizeCreature() {
  creature = {
    bodyR: random(80, 255),
    bodyG: random(80, 255),
    bodyB: random(80, 255),

    bodyWidth: random(160, 240),
    bodyHeight: random(130, 200),

    eyeSize: random(25, 60),
    mouthWidth: random(30, 100),

    antennaLength: random(110, 150),
    antennaTipSize: random(10, 30),
  };
}

function mousePressed() {
  randomizeCreature();
}
