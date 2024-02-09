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

// Implementation of A* Algorithm
function solve() {
  let start = grid[0];
  let goal = grid[index()];
  let open = [];
  let closed = [];
}
