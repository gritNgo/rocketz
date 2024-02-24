// The state of the game
let state = {};

// References to HTML elements
// The canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

newGame();

// *******      ADD GODZILLA!!!!!!!       *********

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

  calculateScale();

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
      ? minHeightCharacter +
        Math.random() * (maxHeightCharacter - minHeightCharacter)
      : minHeight + Math.random() * (maxHeight - minHeight);

    buildings.push({ x, width, height });
  }
  return buildings;
}
function calculateScale() {
  const lastBuilding = state.buildings.at(-1);
  const totalWidthOfTheCity = lastBuilding.x + lastBuilding.width;

  state.scale = window.innerWidth / totalWidthOfTheCity;
}

function initializeBombPosition() {
  const building =
    state.currentPlayer === 1
      ? state.buildings.at(1) // Second building
      : state.buildings.at(-2); // Second last building

  const characterX = building.x + building.width / 2;
  const characterY = building.height;

  const characterHandOffsetX = state.currentPlayer === 1 ? -28 : 28;
  const characterHandOffsetY = 107;

  state.bomb.x = characterX + characterHandOffsetX;
  state.bomb.y = characterY + characterHandOffsetY;
  state.bomb.velocity.x = 0;
  state.bomb.velocity.y = 0;
}

function draw() {
  ctx.save();
  // Flip coordinate system upside down
  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);
  ctx.scale(state.scale, state.scale);

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

  ctx.fillRect(
    0,
    0,
    window.innerWidth / state.scale,
    window.innerHeight / state.scale
  );
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

function drawCharacter(player) {
  ctx.save();
  const building =
    player === 1
      ? state.buildings.at(1) // Second building
      : state.buildings.at(-2); // Second last building

  ctx.translate(building.x + building.width / 2, building.height);

  drawCharacterBody();
  drawCharacterLeftArm(player);
  drawCharacterRightArm(player);
  drawCharacterFace();

  ctx.restore();
}

function drawCharacterBody() {
  ctx.fillStyle = "black";

  ctx.beginPath();

  // Starting Position
  ctx.moveTo(0, 15);

  // Left Leg
  ctx.lineTo(-7, 0);
  ctx.lineTo(-20, 0);

  // Main Body
  ctx.lineTo(-13, 77);
  ctx.lineTo(0, 84);
  ctx.lineTo(13, 77);

  // Right Leg
  ctx.lineTo(20, 0);
  ctx.lineTo(7, 0);

  ctx.fill();
}

function drawCharacterLeftArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(-13, 50);

  if (
    (state.phase === "aiming" && state.currentPlayer === 1 && player === 1) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(-44, 63, -28, 107);
  } else {
    ctx.quadraticCurveTo(-44, 45, -28, 12);
  }

  ctx.stroke();
}

function drawCharacterRightArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(+13, 50);

  if (
    (state.phase === "aiming" && state.currentPlayer === 2 && player === 2) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(+44, 63, +28, 107);
  } else {
    ctx.quadraticCurveTo(+44, 45, +28, 12);
  }

  ctx.stroke();
}

function drawCharacterFace() {
  ctx.strokeStyle = "lightblue";
  ctx.lineWidth = 3;

  ctx.beginPath();

  // Left Eye
  ctx.moveTo(-5, 70);
  ctx.lineTo(-2, 70);

  // Right Eye
  ctx.moveTo(2, 70);
  ctx.lineTo(5, 70);

  // Mouth
  ctx.moveTo(-5, 62);
  ctx.lineTo(5, 62);

  ctx.stroke();
}

function drawBomb() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(state.bomb.x, state.bomb.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

// Event handlers
// ...

function throwBomb() {
  // ...
}

function animate(timestamp) {
  // ...
}
