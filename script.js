// I want to generate the maze based on a seed
let selectedAlgorithm = null;

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

  if (!mazeComplete) {
    if (selectedAlgorithm === 'randomizedDFS') {
      randomizedDepthFirstSearch();
    } else if (selectedAlgorithm === 'binaryTree') {
      binaryTree();
    }
  }
}

function clearGrid(){
  let i;
  for(i = 0; i < grid.length ; i++){
    grid[i].visited = false;
    grid[i].inStack = false;
    grid[i].walls = [true, true, true, true];
  }
  current = grid[0];
  mazeComplete = false;
  stack = [];
}

// Function to set the algorithm
function selectAlgorithm(algorithm) {
  clearGrid();
  selectedAlgorithm = algorithm;
}

// Add event listeners to buttons
document.getElementById('randomizedDFSButton').addEventListener('click', function() {
  selectAlgorithm('randomizedDFS');
});

document.getElementById('binaryTreeButton').addEventListener('click', function() {
  selectAlgorithm('binaryTree');
});