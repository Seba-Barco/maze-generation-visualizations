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

function removeRandomWall() {
  let found = false;
  let i;

  // TO DO: Add a counter to determine if all the walls have been removed and no possible walls can be found
  // While a wall isn't found
  while (!found) {
    // Choose a random Cell
    let r = floor(random(0, columns * rows - 1));
    let a = grid[r];

    // Get it's neighbors (only neighbors that have walls to remove)
    let neighbors = a.getNeighbors();
    neighbors = neighbors.filter((neighbor) => neighbor !== undefined);
    neighbors = neighbors.filter((neighbor) => checkWalls(a, neighbor));

    // From the cells that are left, get a random one and remove the wall
    if (neighbors.length > 0) {
      found = true;
      let b = neighbors[floor(random(0, neighbors.length))];
      highlightRemoval(a);
      highlightRemoval(b);
      removeWalls(a, b);
    }
  }
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

// Highlight the current cell.
function highlight(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  noStroke();
  fill(0, 0, 255, 100);
  rect(x, y, cellSize, cellSize);
}

function highlightRemoval(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  noStroke();
  fill(255, 0, 0, 100);
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
