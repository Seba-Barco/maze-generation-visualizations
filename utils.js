// --------------------
// Functions related to Maze Generation Algorithms
// --------------------

// Takes two Cell objects and deletes the "wall" in between.
function removeWalls(a, b) {
  var horizontal = a.j - b.j;
  var vertical = a.i - b.i;
  if (horizontal == -1) {
    a.walls[right] = false;
    b.walls[left] = false;
  } else if (horizontal == 1) {
    a.walls[left] = false;
    b.walls[right] = false;
  }
  if (vertical == -1) {
    a.walls[bottom] = false;
    b.walls[top] = false;
  } else if (vertical == 1) {
    a.walls[top] = false;
    b.walls[bottom] = false;
  }
}


// --------------------
// Grid Operations
// --------------------

// Translates 2D coordinates into a 1D array index and checks for invalid cases.
function index(i, j) {
  if (i < 0 || j < 0 || i > rows - 1 || j > columns - 1) {
    return -1;
  }
  return j + i * columns;
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
}


// --------------------
// Frontend Functions
// --------------------

// Function to set the algorithm
function selectAlgorithm(algorithm) {
  clearGrid();
  selectedAlgorithm = algorithm;
}