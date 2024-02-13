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

// returns true if it finds a wall in between a and b
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
}

function removeRandomWall() {
  if (availableWalls.length > 0) {
    let r = floor(random(0, availableWalls.length));
    let a = availableWalls[r][0];
    let b = availableWalls[r][1];
    removeWalls(a, b);
    availableWalls.splice(r, 1);
    fading(a);
    fading(b);
  }
  selectedAlgorithm2 = null;
}

// This function returns the cost between 2 nodes. I will use it as G Cost and H Cost
// EUCLIDEAN DISTANCE
/*function getCost(a, b){
  // Euclidean distance formula
  //return Math.sqrt(Math.pow(a.j - b.j, 2) + Math.pow(a.i - b.i, 2));
  let cost = 0;
  // Get the absolute values for the distance
  let horizontal = Math.abs(a.j - b.j);
  let vertical = Math.abs(a.i - b.i);
  if(horizontal > vertical){
    while(vertical > 0){
      cost = cost + 14;
      horizontal--;
      vertical --;
    }
    return cost + (horizontal * 10);
  }
  else{
    while(horizontal > 0){
      cost = cost + 14;
      horizontal --;
      vertical--;
    }
    return cost + (vertical*10);
  }
}*/

function getGScore(a, b) {
  let horizontal = Math.abs(a.j - b.j);
  let vertical = Math.abs(a.i - b.i);

  if (horizontal != 0 && vertical != 0) {
    return 14;
  } else {
    return 10;
  }
}

// Manhattan Distance H Score
function getHScore(a, b) {
  let horizontal = Math.abs(a.j - b.j);
  let vertical = Math.abs(a.i - b.i);
  return horizontal * 10 + vertical * 10;
}

// Manhattan distance
function getCost(a, b) {
  // Euclidean distance formula
  //return Math.sqrt(Math.pow(a.j - b.j, 2) + Math.pow(a.i - b.i, 2));
  let cost = 0;
  // Get the absolute values for the distance
  let horizontal = Math.abs(a.j - b.j);
  let vertical = Math.abs(a.i - b.i);
  return horizontal * 10 + vertical * 10;
}

// Distance from starting cell. "b" being the starting cell
function getGCost(a, b) {
  return getCost(a, b) + a.parent;
}

// Distance from ending cell. "b" being the ending cell
function getHCost(a, b) {
  return getCost(a, b);
}

/*
function getLowestFCost(array) {
  let fCosts = [];
  for (let i = 0; i < array.length; i++) {
    fCosts.push(array[i].fCost);
  }
  //return array[aux.indexOf(Math.min(aux))];
  // Get the min F Cost
  let minfCost = Math.min(fCosts);

  // There may be more than one min F Cost
  let minElements = [];
  // Get all the elements with the min F Cost into minElements
  for (let i = 0; i < array.length; i++) {
    if (array[i].fCost == minfCost) {
      minElements.push(array[i]);
    }
  }

  // If there is more than one min F Cost element, get the min H Cost
  if (minElements.length > 1) {
    let hCosts = [];
    for (let i = 0; i < minElements.length; i++) {
      hCosts.push(minElements[i].hCost);
    }
    let minHCost = Math.min(hCosts);
    for (let i = 0; i < minElements; i++) {
      if (minElements[i].hCost == minHCost) {
        return minElements[i];
      }
    }
  } else {
    return minElements[0];
  }
}*/

function getLowestFCost(array) {
  if (array.length === 0) return null; // Ensure the array is not empty

  // Initialize with the first element assuming it has the minimum F cost
  let lowestFCostCell = array[0];

  // Iterate through the array to find the cell with the minimum F cost
  // and among those, the one with the minimum H cost.
  array.forEach((cell) => {
    if (
      cell.fCost < lowestFCostCell.fCost ||
      (cell.fCost === lowestFCostCell.fCost &&
        cell.hCost < lowestFCostCell.hCost)
    ) {
      lowestFCostCell = cell;
    }
  });

  return lowestFCostCell;
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

// It's important to render the rectangles first, to show the wall lines with full opacity
function showCell(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;

  // Paint the visited cells.
  if (cell.inStack) {
    noStroke();
    // Paint white
    fill(255, 255, 255, 100);
    rect(x, y, cellSize, cellSize);
  } else if (cell.visited) {
    noStroke();
    // Paint cyan
    fill(0, 255, 255, 100);
    rect(x, y, cellSize, cellSize);
  }
  if (cell.solution && cell.explored) {
    noStroke();
    // Paint blue
    fill(33, 28, 106, 255);
    rect(x, y, cellSize, cellSize);
    //circle(x + (cellSize/2), y + (cellSize/2), cellSize/4);
  } else if (cell.explored) {
    noStroke();
    // Paint yellow
    fill(11, 96, 176, 255);
    rect(x, y, cellSize, cellSize);
  }

  stroke(255);
  strokeWeight(2);
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
}

function fading(cell) {
  fadingTracker.push({ cell: cell, time: millis() });
}

// Updates and renders the highlights, fading them over time
function updateAndRenderFading() {
  let currentTime = millis();
  // Filter highlights to remove any that are older than shadingTime seconds
  fadingTracker = fadingTracker.filter(
    (h) => currentTime - h.time < shadingTime
  );

  fadingTracker.forEach((h) => {
    let elapsedTime = currentTime - h.time;
    let alpha = map(elapsedTime, 0, shadingTime, 255, 0); // Calculate fading effect
    var x = h.cell.j * cellSize;
    var y = h.cell.i * cellSize;
    noStroke();
    // Paint white
    fill(255, 255, 255, alpha);
    rect(x, y, cellSize, cellSize);
  });
}

// Highlight the current cell.
function highlight(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  noStroke();
  // Yellow
  fill(255, 237, 13, 255);
  rect(x, y, cellSize, cellSize);
  fading(cell);
}

function highlightSolution(cell) {
  var x = cell.j * cellSize;
  var y = cell.i * cellSize;
  noStroke();
  // Yellow
  fill(255, 237, 13, 100);
  rect(x, y, cellSize, cellSize);
  fading(cell);
}

function clearGrid() {
  let i;
  for (i = 0; i < grid.length; i++) {
    grid[i].visited = false;
    grid[i].inStack = false;
    grid[i].walls = [true, true, true, true];
    grid[i].solution = false;
    grid[i].explored = false;
    grid[i].gCost = 0;
    grid[i].hCost = 0;
    grid[i].fCost = 999999;
    grid[i].parent = 0;
  }
  current = grid[startingCell];
  mazeComplete = false;
  stack = [];
  indiceHK = 0;
  fadingTracker = [];

  // A* Search Algorithm
  openList = [];
  closedList = [];
  goalFound = false;
  neighbors = [];
  drawPath = false;
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
