// The state of the game
let state = {};

// References to HTML elements
// The canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

newGame();

function newGame() {
  // Initialize game state
  state = {
    phase: "aiming", // aiming | in flight | celebrating
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      velocity: { x: 0, y: 0 },
    },
    buildings: generateBuildings(),
  };

  initializeBombPosition();

  draw();
}

function generateBuildings() {
  const buildings = [];
  for (let index = 0; index < 8; index++) {
    const previousBuilding = buildings[index - 1];

    const x = previousBuilding
      ? previousBuilding.x + previousBuilding.width + 4
      : 0;

    const minWidth = 80;
    const maxWidth = 130;
    const width = minWidth + Math.random() * (maxWidth - minWidth);

    const platformWithCharacter = index === 1 || index === 6;

    const minHeight = 40;
    const maxHeight = 300;
    const minHeightCharacter = 30;
    const maxHeightCharacter = 150;

    const height = platformWithCharacter
      ? minHeightCharacter + Math.random() * (maxHeightCharacter - minHeightCharacter)
      : minHeight + Math.random() * (maxHeight - minHeight);

    buildings.push({ x, width, height });
  }
  return buildings;
}

function initializeBombPosition() {
  // ...
}

function draw() {
  ctx.save();
  // Flip coordinate system upside down
  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);

  // Draw scene
  drawBackground();
  drawBuildings();
  drawCharacter(1);
  drawCharacter(2);
  drawBomb();

  // Restore transformation
  ctx.restore();
}

function drawBackground() {
  ctx.fillStyle = "gray";

  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

function drawCharacter(player) {
  // ...
}

function drawBomb() {
  // ...
}

// Event handlers
// ...

function throwBomb() {
  // ...
}

function animate(timestamp) {
  // ...
}
