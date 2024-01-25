// I want to generate the maze based on a seed
// Objective 2: Generate a round map with round tiles

// Slider
var columns = 50,
  rows = 50;
var cellSize = 18;
var grid = [];
var current;
var top = 0,
  right = 1,
  bottom = 2,
  left = 3;
var stack = [];

function setup() {
  createCanvas(columns * cellSize, rows * cellSize);
  // Go through the grid creating Cell objects. If i want to change the axis, i can do it here
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  //frameRate(5);
}

function draw() {
  background(51);
  for (var k = 0; k < grid.length; k++) {
    grid[k].show();
  }
  // Pick a random neighbor
  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    // Step 2
    stack.push(current);
    current.inStack = true;
    // Remove walls between cells
    removeWalls(current, next);

    // make the selected not visited cell the next one
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
    current.inStack = false;
  }
}

function index(i, j) {
  // Invalid cases
  if (i < 0 || j < 0 || i > rows - 1 || j > columns - 1) {
    return -1;
  }
  return j + i * columns;
}

function removeWalls(a, b) {
  var horizontal = a.j - b.j;
  var vertical = a.i - b.i;
  if (horizontal == -1) {
    a.walls[right] = false;
    b.walls[left] = false;
  }
  else if (horizontal == 1) {
    a.walls[left] = false;
    b.walls[right] = false;
  }
  if (vertical == -1) {
    a.walls[bottom] = false;
    b.walls[top] = false;
  }
  else if (vertical == 1) {
    a.walls[top] = false;
    b.walls[bottom] = false;
  }
}
