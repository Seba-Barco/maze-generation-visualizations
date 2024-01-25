// I want to generate the maze based on a seed

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
  // Grid creation. Important: i --> vertical axis. j --> horizontal axis
  createCanvas(columns * cellSize, rows * cellSize);
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  // This will be the selected cell to start
  current = grid[0];
  //frameRate(5);
}

function draw() {
  background(51);
  for (var k = 0; k < grid.length; k++) {
    grid[k].show();
  }
  
  randomizedDepthFirstSearch();
}
