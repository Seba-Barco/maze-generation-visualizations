// Randomized Depth-First Search
function randomizedDepthFirstSearch() {
  current.visited = true;
  highlight(current);
  let next = current.getUnvisitedRandomNeighbor();

  if (next) {
    stack.push(current);
    current.inStack = true;
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
    current.inStack = false;
  } else {
    mazeComplete = true;
  }
}

// Binary Tree
function binaryTree() {
  let currentIndex = grid.indexOf(current);

  highlight(current);
  current.visited = true;

  if (currentIndex < columns * rows - 1) {
    let rbNeighbors = [current.getRightNeighbor(), current.getBottomNeighbor()];
    rbNeighbors = rbNeighbors.filter((neighbor) => neighbor !== undefined);

    let otherCell = rbNeighbors[floor(random(0, rbNeighbors.length))];
    if (otherCell) {
      removeWalls(current, otherCell);
    }

    current = grid[currentIndex + 1];
  } else {
    mazeComplete = true;
  }
}

// Hunt & Kill
var indiceHK = 0;

function huntAndKill() {
  current.visited = true;
  highlight(current);
  let next = current.getUnvisitedRandomNeighbor();
  // Enter Walking Mode
  if (next) {
    //next.visited = true;
    removeWalls(current, next);
    current = next;
  } else {
    // Enter Hunt Mode
    if (indiceHK < rows * columns) {
      current = grid[indiceHK];
      indiceHK++;
    } else {
      mazeComplete = true;
    }
  }
}

// Growing Tree - Always Select Last
function growingTreeLast() {
  current.visited = true;
  highlight(current);

  if (current.getUnvisitedRandomNeighbor()) {
    let neighbor = current.getUnvisitedRandomNeighbor();
    removeWalls(current, neighbor);
    stack.push(neighbor);
    neighbor.inStack = true;
    neighbor.visited = true;
    // The next highlight is only for rendering consistency purposes to align with RDFS
    //highlight(neighbor);
  } else {
    let next = stack.pop();
    next.inStack = false;

    current = next;
  }
  if (stack.length == 0) {
    mazeComplete = true;
  }
}

// Growing Tree - Always Select Random
function growingTreeRandom() {
  current.visited = true;
  highlight(current);

  if (current.getUnvisitedRandomNeighbor()) {
    neighbor = current.getUnvisitedRandomNeighbor();
    removeWalls(current, neighbor);
    stack.push(neighbor);
    neighbor.inStack = true;
    neighbor.visited = true;
    //highlight(neighbor);
  } else {
    let r = floor(random(0, stack.length));
    next = stack[r];
    stack.splice(r, 1);
    next.inStack = false;

    current = next;
  }
  if (stack.length == 0) {
    mazeComplete = true;
  }
}

var openList = [];
var closedList = [];
var goalFound = false;
var neighbors = [];
var drawPath = false;

function solve() {
  if (openList.length == 0) {
    // Find a way to fix next 2 lines out of this code
    var startSolveCell = grid[0];
    var endSolveCell = grid[rows * columns - 1];
    startSolveCell.fCost = 0;
    openList.push(startSolveCell);
  }

  while (!goalFound) {
    current = getLowestFCost(openList);
    // Remove this
    current.explored = true;
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);

    if (current === endSolveCell) {
      goalFound = true;
      drawPath = true;
    }
    // get all available current's neighbors
    neighbors = current.getNeighbors();
    neighbors = neighbors.filter(
      (neighbor) =>
        neighbor !== undefined &&
        !checkWalls(current, neighbor) &&
        !closedList.includes(neighbor)
    );

    // For each neighbor, set the parent, and calculate all costs
    for (let i = 0; i < neighbors.length; i++) {
      let tempGScore = current.gCost + getGScore(current, neighbors[i]);
      let tempHScore = getHScore(neighbors[i], endSolveCell);
      let tempFScore = tempGScore + tempHScore;
      if (!openList.includes(neighbors[i]) || tempFScore < neighbors[i].fCost) {
        neighbors[i].gCost = tempGScore;
        neighbors[i].hCost = tempHScore;
        neighbors[i].fCost = tempFScore;
        neighbors[i].parent = index(current.i, current.j);

        if (!openList.includes(neighbors[i])) {
          openList.push(neighbors[i]);
        }
      }
    }
  }

  // Draw the solution path
  if (goalFound && drawPath) {
    current = grid[rows * columns - 1];
    while (current != grid[0]) {
      current.solution = true;
      current = grid[current.parent];
    }
    current.solution = true;
    drawPath = false;
  }

  //current = grid[rows * columns - 1];
  /*if (goalFound && drawPath) {
    current.solution = true;
    current = grid[current.parent];
    if (current == grid[0]) {
      drawPath = false;
    }
  }*/
}
