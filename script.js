// I want to generate the maze based on a seed
// Objective 2: Generate a round map with round tiles

// Slider
var columns = 50,
  rows = 50;
// The cellSize variable represents a practical aspect related to the visualization
// of the grid on the canvas.
// Slider
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

// Constructor function
function Cell(i, j) {
  // Vertical position
  this.i = i;
  // Horizontal position
  this.j = j;
  // Boolean values to enable/disable the walls of each cell in the grid
  this.walls = [true, true, true, true];
  this.visited = false;
  this.inStack = false;

  this.checkNeighbors = function () {
    var neighbors = [
      // top
      grid[index(i - 1, j)],
      // right
      grid[index(i, j + 1)],
      // bottom
      grid[index(i + 1, j)],
      // left
      grid[index(i, j - 1)],
    ];

    var notVisited = [];

    for (k = 0; k < neighbors.length; k++) {
      if (neighbors[k] && !neighbors[k].visited) {
        notVisited.push(neighbors[k]);
      }
    }

    if (notVisited.length > 0) {
      var r = floor(random(0, notVisited.length));
      return notVisited[r];
    } else {
      return undefined;
    }
  };

  // Rendering logic
  this.show = function () {
    var x = this.j * cellSize;
    var y = this.i * cellSize;
    stroke(255);

    // Draw the border lines for the cells
    if (this.walls[top]) {
      line(x, y, x + cellSize, y);
    }
    if (this.walls[right]) {
      line(x + cellSize, y, x + cellSize, y + cellSize);
    }
    if (this.walls[bottom]) {
      line(x, y + cellSize, x + cellSize, y + cellSize);
    }
    if (this.walls[left]) {
      line(x, y, x, y + cellSize);
    }

    // paint the visited cells
    if (this.inStack) {
      noStroke();
      fill(255, 255, 255, 100);
      rect(x, y, cellSize, cellSize);
    }
    else if(this.visited){
      noStroke();
      fill(19, 196, 163, 100);
      rect(x, y, cellSize, cellSize);
    }
  };

  // Highlight the current cell
  this.highlight = function () {
    var x = this.j * cellSize;
    var y = this.i * cellSize;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, cellSize, cellSize);
  };
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
  if (horizontal == 1) {
    a.walls[left] = false;
    b.walls[right] = false;
  }
  if (vertical == -1) {
    a.walls[bottom] = false;
    b.walls[top] = false;
  }
  if (vertical == 1) {
    a.walls[top] = false;
    b.walls[bottom] = false;
  }
}
