/* Randomized Depth-First Search
  1. Make the initial cell the current cell
    1.1 Mark it as visited
2. While there are unvisited cells
    2.1 If the current cell has any neighors which have not been visited
        2.1.1 Choose randomly one of the unvisited neighbors
        2.1.2 Push the current cell to the stack
        2.1.3 Remove the wall between the current cell and the chosen cell
        2.1.4 Make the chosen cell the current cell and mark it as visited
    2.2 Else if stack is not empty
        2.2.1 Pop a cell from the stack
        2.2.2 Make it the current cell
*/
function randomizedDepthFirstSearch() {
  // Step 1 --> In setup code
  // Step 1.1
  current.visited = true;
  highlight(current);
  // Step 2
  // Step 2.1 & 2.1.1
  let next = current.getRandomNeighbor();

  if (next) {
    //next.visited = true;
    // Step 2.1.2
    stack.push(current);
    current.inStack = true;
    // Step 2.1.3
    removeWalls(current, next);
    // Step 2.1.4
    current = next;
    // Step 2.2
  } else if (stack.length > 0) {
    // Step 2.2.1 & 2.2.2
    current = stack.pop();
    current.inStack = false;
  } else {
    mazeComplete = true;
  }
}

var indiceHK = 0;

function huntAndKill() {
  // Choose a Starting location (in setup)
  current.visited = true;
  highlight(current);
  let next = current.getRandomNeighbor();
  // Perform a random walk, carving passages to unvisited neighbors,
  // until the current cell has no unvisited neighbors
  if (next) {
    //next.visited = true;
    removeWalls(current, next);
    current = next;
  } else {
    // Enter hunt mode
    if (indiceHK < rows * columns) {
      current = grid[indiceHK];
      indiceHK++;
    } else {
      mazeComplete = true;
    }
  }
}

/* Binary Tree
    1. For every cell in the grid, randomly carve a passage either north or west.
*/
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

function growingTreeLast() {
  current.visited = true;
  highlight(current);

  if (current.getRandomNeighbor()) {
    let neighbor = current.getRandomNeighbor();
    removeWalls(current, neighbor);
    stack.push(neighbor);
    neighbor.inStack = true;
    neighbor.visited = true;
  } else {
    let next = stack.pop();
    next.inStack = false;

    current = next;
  }
  if (stack.length == 0) {
    mazeComplete = true;
  }
}

function growingTreeRandom() {
  current.visited = true;
  highlight(current);

  if (current.getRandomNeighbor()) {
    neighbor = current.getRandomNeighbor();
    removeWalls(current, neighbor);
    stack.push(neighbor);
    neighbor.inStack = true;
    neighbor.visited = true;
  } else {
    let r = floor(random(0,stack.length));
    next = stack[r];
    stack.splice(r,1);
    next.inStack = false;

    current = next;
  }
  if (stack.length == 0) {
    mazeComplete = true;
  }
}