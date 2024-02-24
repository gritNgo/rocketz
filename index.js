// The state of the game
let state = {};

// References to HTML elements
// The canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

newGame();

// Add Godzilla

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
