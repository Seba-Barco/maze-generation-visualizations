// I want to generate the maze based on a seed
var selectedAlgorithm = null;
var selectedAlgorithm2 = null;
let playing = true;
let wallsFetched = false;

function setup() {
  // Grid creation. Important: i --> vertical axis. j --> horizontal axis
  createCanvas(columns * cellSize + 1, rows * cellSize + 1);
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  // This will be the selected cell to start
  //current = grid[startingCell];
  frameRate(45);
}

function draw() {
  background(51);

  updateAndRenderFading();

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
    } else if (selectedAlgorithm === "growingTreeLast") {
      growingTreeLast();
    } else if (selectedAlgorithm === "growingTreeRandom") {
      growingTreeRandom();
      // Clear Grid Option
    } else if (selectedAlgorithm === "clearGrid") {
      clearGrid();
    }
    selectedAlgorithm2 = null;
    wallsFetched = false;
  } else {
    if (!wallsFetched) {
      getAvailableWalls();
      wallsFetched = true;
    }

    // Only remove walls if the maze is complete
    if (selectedAlgorithm2 === "removeRandomWall") {
      removeRandomWall();
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
  .getElementById("growingTreeLastButton")
  .addEventListener("click", function () {
    selectAlgorithm("growingTreeLast");
  });

document
  .getElementById("growingTreeRandomButton")
  .addEventListener("click", function () {
    selectAlgorithm("growingTreeRandom");
  });

// Clear Grid Button

document
  .getElementById("clearGridButton")
  .addEventListener("click", function () {
    selectAlgorithm("clearGrid");
  });

// Remove Random Wall Button
document
  .getElementById("removeRandomWallButton")
  .addEventListener("click", function () {
    selectAlgorithm2("removeRandomWall");
  });

document
  .getElementById("playPauseButton")
  .addEventListener("click", function () {
    if (playing) {
      noLoop(); // Pause the sketch
    } else {
      loop(); // Resume the sketch
    }
    playing = !playing; // Toggle the playing state
  });
