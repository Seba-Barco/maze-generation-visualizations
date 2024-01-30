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
  var neighbors = current.getNeighbors();
  var notVisited = [];

  for (k = 0; k < neighbors.length; k++) {
    if (neighbors[k] && !neighbors[k].visited) {
      notVisited.push(neighbors[k]);
    }
  }

  if (notVisited.length > 0) {
    var r = floor(random(0, notVisited.length));
    next = notVisited[r];
  } else {
    next = undefined;
  }

  if (next) {
    next.visited = true;
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

/* Binary Tree
    1. For every cell in the grid, randomly carve a passage either north or west.
*/
function binaryTree() {
  var currentIndex = grid.indexOf(current);

  highlight(current);
  current.visited = true;

  if (currentIndex < columns * rows - 1) {
    var rbNeighbors = [current.getRightNeighbor(), current.getBottomNeighbor()];
    rbNeighbors = rbNeighbors.filter((neighbor) => neighbor !== undefined);

    var otherCell = rbNeighbors[floor(random(0, rbNeighbors.length))];
    if (otherCell) {
      removeWalls(current, otherCell);
    }

    current = grid[currentIndex + 1];
  } else {
    mazeComplete = true;
  }
}
