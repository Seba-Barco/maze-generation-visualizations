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
    showCell(grid[k]);
  }

  if (!mazeComplete) {
    if (selectedAlgorithm === "randomizedDFS") {
      randomizedDepthFirstSearch();
    } else if (selectedAlgorithm === "binaryTree") {
      binaryTree();
    } else if (selectedAlgorithm === "huntAndKill") {
      huntAndKill();
    } else if (selectedAlgorithm === "growingTree") {
      growingTree();
    }
  }
}

// Add event listeners to buttons
document
  .getElementById("randomizedDFSButton")
  .addEventListener("click", function () {
    selectAlgorithm("randomizedDFS");
  });

document
  .getElementById("binaryTreeButton")
  .addEventListener("click", function () {
    selectAlgorithm("binaryTree");
  });

document
  .getElementById("huntAndKillButton")
  .addEventListener("click", function () {
    selectAlgorithm("huntAndKill");
  });

document
  .getElementById("growingTreeButton")
  .addEventListener("click", function () {
    selectAlgorithm("growingTree");
  });
