// --------------------
// Functions related to Maze Generation Algorithms
// --------------------

// Takes two Cell objects and deletes the "wall" in between.
function removeWalls(a, b) {
  let horizontal = a.j - b.j;
  let vertical = a.i - b.i;

  // Horizontal checking
  if (horizontal == -1) {
    a.walls[rightWall] = false;
    b.walls[leftWall] = false;
  } else if (horizontal == 1) {
    a.walls[leftWall] = false;
    b.walls[rightWall] = false;
  }

  // Vertical checking
  if (vertical == -1) {
    a.walls[bottomWall] = false;
    b.walls[topWall] = false;
  } else if (vertical == 1) {
    a.walls[topWall] = false;
    b.walls[bottomWall] = false;
  }
}

function checkWalls(a, b) {
  let horizontal = a.j - b.j;
  let vertical = a.i - b.i;
  let foundWall = false;

  if (horizontal == -1) {
    if (a.walls[rightWall] == true && b.walls[leftWall] == true) {
      foundWall = true;
    }
  } else if (horizontal == 1) {
    if (a.walls[leftWall] == true && b.walls[rightWall] == true) {
      foundWall = true;
    }
  }
  if (vertical == -1) {
    if (a.walls[bottomWall] == true && b.walls[topWall] == true) {
      foundWall = true;
    }
  } else if (vertical == 1) {
    if (a.walls[topWall] == true && b.walls[bottomWall] == true) {
      foundWall = true;
    }
  }
  return foundWall;
}

function getAvailableWalls() {
  for (let i = 0; i < grid.length; i++) {
    let a = grid[i];
    let b = grid[i].getRightNeighbor();
    let c = grid[i].getBottomNeighbor();
    if (b && checkWalls(a, b)) {
      availableWalls.push([a, b]);
    }
    if (c && checkWalls(a, c)) {
      availableWalls.push([a, c]);
    }
  }
  console.log(availableWalls);
}

function removeRandomWall() {
  if (availableWalls.length > 0) {
    let r = floor(random(0, availableWalls.length));
    let a = availableWalls[r][0];
    let b = availableWalls[r][1];
    removeWalls(a, b);
    availableWalls.splice(r,1);
    highlightRemoval(a);
    highlightRemoval(b);
  }
  selectedAlgorithm2 = null;
}

// --------------------
// Grid Operations
// --------------------

// Translates 2D coordinates into a 1D array index and checks for invalid cases.
function index(i, j) {
  // Invalid cases
  if (i < 0 || j < 0 || i > rows - 1 || j > columns - 1) {
    return -1;
  }
  return j + i * columns;
}

// --------------------
// Rendering Logic
// --------------------

function showCell(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  stroke(255);

  // Draw the border lines for the cells
  if (cell.walls[topWall]) {
    line(x, y, x + cellSize, y);
  }
  if (cell.walls[rightWall]) {
    line(x + cellSize, y, x + cellSize, y + cellSize);
  }
  if (cell.walls[bottomWall]) {
    line(x + cellSize, y + cellSize, x, y + cellSize);
  }
  if (cell.walls[leftWall]) {
    line(x, y + cellSize, x, y);
  }

  // Paint the visited cells.
  if (cell.inStack) {
    noStroke();
    fill(255, 255, 255, 100);
    rect(x, y, cellSize, cellSize);
  } else if (cell.visited) {
    noStroke();
    fill(0, 255, 255, 100);
    rect(x, y, cellSize, cellSize);
  }
}

function highlightRemoval(cell) {
  highlightTracker.push({ cell: cell, time: millis() });
}

// Updates and renders the highlights, fading them over time
function updateAndRenderHighlights() {
  let currentTime = millis();
  // Filter highlights to remove any that are older than shadingTime seconds
  highlightTracker = highlightTracker.filter(
    (h) => currentTime - h.time < shadingTime
  );

  highlightTracker.forEach((h) => {
    let elapsedTime = currentTime - h.time;
    let alpha = map(elapsedTime, 0, shadingTime, 255, 0); // Calculate fading effect
    var x = h.cell.j * cellSize;
    var y = h.cell.i * cellSize;
    noStroke();
    fill(255, 0, 0, alpha);
    rect(x, y, cellSize, cellSize);
  });
}

// Highlight the current cell.
function highlight(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  noStroke();
  fill(0, 0, 255, 100);
  rect(x, y, cellSize, cellSize);
}

function clearGrid() {
  let i;
  for (i = 0; i < grid.length; i++) {
    grid[i].visited = false;
    grid[i].inStack = false;
    grid[i].walls = [true, true, true, true];
  }
  current = grid[0];
  mazeComplete = false;
  stack = [];
  indiceHK = 0;
}

// --------------------
// Frontend Functions
// --------------------

// Function to set the algorithm
function selectAlgorithm(algorithm) {
  clearGrid();
  selectedAlgorithm = algorithm;
}

function selectAlgorithm2(algorithm) {
  selectedAlgorithm2 = algorithm;
}
